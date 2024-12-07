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
import pandas as pd
from pymongo import MongoClient # TODO: add to requirements.txt
import certifi # TODO: add to requirements.txt
import sys
sys.path.append('/HealthSifters/flask-server/chatbot/')
from chatbot import get_chatbot_response  



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

# method to set up the MongoDB database 
def setup_db(data_path):
    print("setup_db is running") # testing purposes 

    # set up MongoDB
    # client = MongoClient('mongodb://localhost:27017/') # for local mongodb
    client = MongoClient('mongodb+srv://pragathidurgarajarajan:healthsifters@healthsiftdb.zjgq3.mongodb.net/', tlsCAFile=certifi.where()) # TODO: hash the client url 
    db = client['healthsiftDB'] # database name

    # set up collection 
    medicine = db['medicine']
    medicine.delete_many({}) # clears db for now so that i can verify how many records are being added in 

    add_orig_data(data_path, db, medicine)

# method to add data to the database 
def add_orig_data(csv_path, db, medicine):

    print("add_orig_data() is running")  

    # add data to medicine collection if it is empty 
    if medicine.count_documents({}) == 0:
        print("num docs in medicine was == 0. Records about to be added to db") 

        df = pd.read_csv(csv_path) # read data from medicine data csv 
        default_medicines = df.to_dict(orient='records')

        # insert the read data to the db 
        medicine.insert_many(default_medicines)
        print("healthsiftDB message: Default medicines added to the database.")  
        print(len(default_medicines), "added to healthsiftDB") 
    else:
        print("num docs was not 0")

setup_db("data/medicines.csv") # you have to make sure mongodb is set up on your device 


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
        
        # user already exists.
        return jsonify({'error': -1}), 409

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

    # sign up successfully
    return jsonify({'status': 1}), 201

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
        return jsonify({'status': 1}), 200
    else:
        logger.warning(f"Failed login attempt for user {email}.")
        return jsonify({'error': -1}), 401

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
        return jsonify({'status': 1}), 200
    else:
        logger.warning(f"Failed admin login attempt for user {email}.")
        return jsonify({'error': -1}), 401

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

@app.route("/searchQuery", methods=['POST'])
def searchQuery():
    data = request.get_json()

    # holds what the user whats to search for
    search_query = data['search']
    # holds the filters the user wants to use. (btw its a list)
    filter_list = data['filters']
    
    return jsonify({'status' : 'got search query'})

@app.route("/searchQueryNoFilter", methods=['POST'])
def searchQueryNoFilter():
    data = request.get_json()
    # holds what the user whats to search for
    search_query = data['search']

    # connect to MongoDB
    client = MongoClient('mongodb+srv://pragathidurgarajarajan:healthsifters@healthsiftdb.zjgq3.mongodb.net/', tlsCAFile=certifi.where())
    # get the database 
    db = client['healthsiftDB'] 
    # get the collection 
    medicine_collection = db['medicine']

    # process user's search query
    search_query = search_query.lower().strip()
    search_words = search_query.split(' ')
    words_to_ignore = ['a', 'the', 'in', 'for', 'by', 'i', 'to', 'this']
    processed_search_words = []

    for word in search_words:
        if not (word in words_to_ignore):
            processed_search_words.append(word)

    # iterate through medicines and get data on each
    search_results = []
    for medicine in medicine_collection.find():
        for word in processed_search_words:
            if (word in medicine.get('Medicine Name', '').lower().strip()) or (word in medicine.get('Medicine Use', '').lower().strip()):
                # get data from medicine collection
                medicine_data = get_medicine_data_helper(medicine)
                search_results.append(medicine_data)

    # remove duplicates from search results list 
    no_duplicates_search_results = []
    for medicine in search_results:
        if medicine not in no_duplicates_search_results:
            no_duplicates_search_results.append(medicine)

    search_results = no_duplicates_search_results

    # return search results if any are found 
    if len(search_results) > 0:
        return jsonify({'status' : 'results successfully retrieved', 'search_results' : search_results}), 200
    return jsonify({'status' : 'no results found', 'search_results' : []})

def get_medicine_data_helper(medicine):
    # get data for the medicine
    name = medicine.get('Medicine Name', 'Name Unknown')
    use = medicine.get('Medicine Use', 'Use Unknown')
    side_effects = medicine.get('Medicine Side Effects', 'Side Effects Unknown')
    ingredients = medicine.get('Medicine Ingredients', 'Ingredients Unknown')
    reviews = medicine.get('Medicine Customer Reviews', 'No Reviews Available')
    link = medicine.get('Pharmacy Purchase Link', 'Pharmacy Link Unavailable')

    # create object to store the data 
    medicine_data = {
        'Medicine Name' : name,
        'Medicine Use' : use,
        'Medicine Side Effects' : side_effects,
        'Medicine Ingredients' : ingredients,
        'Medicine Customer Reviews' : reviews,
        'Pharmacy Purchase Link' : link
    }

    # return data as object 
    return medicine_data    



@app.route("/sendUserInputToChatbot", methods=['POST'])
def sendUserInputToChatbot():
    data = request.get_json()

    # holds what the user's input for the chatbot 
    user_input = data['userInput']

    # send user input to chatbot and get response 
    response = get_chatbot_response(user_input)

    # send chatbot's response back to the frontend 
    return jsonify({'chatbotReply' : response})

@app.route("/getMedicineData", methods=['GET'])
def sendMedicineDataToFrontend():

    # connect to MongoDB
    client = MongoClient('mongodb+srv://pragathidurgarajarajan:healthsifters@healthsiftdb.zjgq3.mongodb.net/', tlsCAFile=certifi.where())

    # get the database 
    db = client['healthsiftDB'] 

    # get the collection 
    medicine_collection = db['medicine']

    # iterate through medicines and get data on each
    all_medicine_data = []
    for medicine in medicine_collection.find():
        # get medicine data object  
        medicine_data = get_medicine_data_helper(medicine)

        # add object to list of all medicines' data 
        all_medicine_data.append(medicine_data)

    # send data to frontend as a list of jsons 
    if len(all_medicine_data) > 0:
        return jsonify({'status': 'successfully retrieved data', 'medicine_data_list' : all_medicine_data}), 200
    return jsonify({'status': 'error retrieving data', 'medicine_data_list' : all_medicine_data}), 404

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
