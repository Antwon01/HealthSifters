import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from threading import Lock
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from marshmallow import Schema, fields, ValidationError
import logging

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key')  # Replace with a strong secret in production

DATA_FILE = 'users.json'
LOCK = Lock()  # To ensure thread-safe file operations

# Initialize CORS
CORS(app, origins="*")  # Restrict to specific origins in production

# Initialize Limiter
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

# Initialize users.json file
def initialize_users_file():
    """Initialize the users.json file with the correct structure if it doesn't exist or is malformed."""
    if not os.path.exists(DATA_FILE):
        with LOCK:
            with open(DATA_FILE, 'w') as f:
                json.dump({"users": []}, f, indent=4)
        logger.info(f"{DATA_FILE} created with initial structure.")
    else:
        try:
            with LOCK:
                with open(DATA_FILE, 'r') as f:
                    data = json.load(f)
            if not isinstance(data, dict) or 'users' not in data or not isinstance(data['users'], list):
                raise ValueError("Incorrect structure.")
        except (json.JSONDecodeError, ValueError):
            with LOCK:
                with open(DATA_FILE, 'w') as f:
                    json.dump({"users": []}, f, indent=4)
            logger.warning(f"{DATA_FILE} was malformed and has been reset with the correct structure.")

# Call initialization at the start
initialize_users_file()

# Utility Functions
def load_users():
    """Load users from the JSON file."""
    with LOCK:
        with open(DATA_FILE, 'r') as f:
            return json.load(f)

def save_users(data):
    """Save users to the JSON file."""
    with LOCK:
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=4)

# Input Validation Schemas
class SignUpSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=lambda p: len(p) >= 8)
    repassword = fields.Str(required=True)

sign_up_schema = SignUpSchema()

class LoginSchema(Schema):
    username = fields.Email(required=True)
    password = fields.Str(required=True)

login_schema = LoginSchema()

class ForgotPasswordSchema(Schema):
    email = fields.Email(required=True)

forgot_password_schema = ForgotPasswordSchema()

# Routes

@app.route("/signUpInformation", methods=['POST'])
@limiter.limit("10 per minute")  # Limit to 10 sign-up attempts per minute per IP
def sign_up():
    """
    User Sign-Up Endpoint
    Expects JSON with 'email', 'password', and 'repassword'.
    """
    try:
        data = sign_up_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 400

    email = data['email']
    password = data['password']
    re_password = data['repassword']

    # Load existing users
    users_data = load_users()
    users = users_data['users']

    # Check if user already exists
    if any(user['email'] == email for user in users):
        return jsonify({'error': 'User already exists.'}), 409

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Create new user
    new_user = {
        "email": email,
        "password": hashed_password,
        "is_admin": False  # Default to False. Set to True manually for admin users.
    }
    users.append(new_user)
    save_users(users_data)

    logger.info(f"New user registered: {email}")
    return jsonify({'status': 'Sign up successful.'}), 201

@app.route("/loginInformation", methods=['POST'])
@limiter.limit("5 per minute")  # Limit to 5 login attempts per minute per IP
def login():
    """
    User Login Endpoint
    Expects JSON with 'username' (email) and 'password'.
    """
    try:
        data = login_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 400

    email = data['username']
    password = data['password']

    # Load users
    users_data = load_users()
    users = users_data['users']
    
    # Find user
    user = next((user for user in users if user['email'] == email), None)

    if user and check_password_hash(user['password'], password):
        logger.info(f"User {email} logged in successfully.")
        return jsonify({'status': "Login successful."}), 200
    else:
        logger.warning(f"Failed login attempt for user {email}.")
        return jsonify({'error': "Invalid credentials."}), 401

@app.route("/adminInformation", methods=['POST'])
@limiter.limit("5 per minute")  # Limit to 5 admin login attempts per minute per IP
def admin_login():
    """
    Admin Login Endpoint
    Expects JSON with 'username' (email) and 'password'.
    """
    try:
        data = login_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 400

    email = data['username']
    password = data['password']

    # Load users
    users_data = load_users()
    users = users_data['users']

    # Find admin user
    admin_user = next((user for user in users if user['email'] == email and user.get('is_admin', False)), None)

    if admin_user and check_password_hash(admin_user['password'], password):
        logger.info(f"Admin {email} logged in successfully.")
        return jsonify({'status': "Admin login successful."}), 200
    else:
        logger.warning(f"Failed admin login attempt for user {email}.")
        return jsonify({'error': "Invalid admin credentials."}), 401

@app.route("/forgotPassword", methods=['POST'])
@limiter.limit("10 per hour")  # Limit to 10 password reset requests per hour per IP
def forgot_password():
    """
    Forgot Password Endpoint
    Expects JSON with 'email'.
    """
    try:
        data = forgot_password_schema.load(request.get_json())
    except ValidationError as err:
        return jsonify(err.messages), 400

    email = data['email']

    # Load users
    users_data = load_users()
    users = users_data['users']

    # Find user
    user = next((user for user in users if user['email'] == email), None)

    if user:
        # Placeholder for email sending logic
        # Implement actual email sending with a reset link/token
        logger.info(f"Password reset email would be sent to {email}.")
        return jsonify({'status': "Password reset email has been sent."}), 200
    else:
        logger.warning(f"No user found with email {email}.")
        return jsonify({'error': "Email not found."}), 404

# Example Protected Route (Requires Proper Implementation)
@app.route("/protected", methods=['GET'])
def protected():
    """
    Example Protected Endpoint
    """
    # This is a placeholder. Implement authentication to protect this route.
    return jsonify({'status': 'This is a protected route.'}), 200

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found'}), 404
  
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=8080)
    app.run(debug=True, port="8080")
