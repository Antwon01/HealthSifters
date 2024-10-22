from flask import Flask, request, jsonify
from flask_cors import CORS

app=Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/loginInformation", methods=['POST'])
def loginInformation():

    username = request.json.get('username')
    password = request.json.get('password')

    print(f'Username: {username}')
    print(f'Password: {password}')
    
    print("Account information received.")

    return jsonify({'status' : "Account information received."})

@app.route("/adminInformation", methods=['POST'])
def adminIinformation():
    username = request.json.get('username')
    password = request.json.get('password')

    print(f"Username: {username}")
    print(f"Password: {password}")
    print("Admin information has been received.")

    return {'status' : "Admin information has been received"}

@app.route("/forgotPassword", methods=['POST'])
def forgotPassword():
    
    email = request.json.get('email')

    print("Email Recieved.")

    print(f"Email Sent to {email}.")

    return jsonify({'status' : "Email has been sent."})


@app.route("/signUpInformation", methods=['POST'])
def signUpInformation():
    email = request.json.get('email')
    password = request.json.get('password')
    rePassword = request.json.get('repassword')

    print("Sign up information has been received.")

    print(f"Email: {email}")
    print(f"Password: {password}")
    print(f"Email: {rePassword}")

    return jsonify({'status' : 'Sign up information received.'})



if __name__ == "__main__":
    app.run(debug=True, port="8080")