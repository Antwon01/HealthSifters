from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd

app=Flask(__name__)
cors = CORS(app, origins="*")

# MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['healthsiftDB'] 

# Create a collection (similar to tables in SQL)
medicine = db['medicine']
medicine.delete_many({}) # clears db for now so that i can verify how many records are being added in seed_data()

def seed_data(csv_path):
    print("seed_data() is running")
    if medicine.count_documents({}) == 0:
        print("num docs in medicine was == 0. Records about to be added to db")

        df = pd.read_csv(csv_path)
    
        # Convert the DataFrame into a list of dictionaries
        default_medicines = df.to_dict(orient='records')

        medicine.insert_many(default_medicines)
        print("healthsiftDB message: Default medicines added to the database.")
        print(len(default_medicines), "added to healthsiftDB")
    else:
        print("num docs was not 0")

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



if __name__ == "__main__":
    seed_data('medicines.csv')
    app.run(debug=True, port="8080")