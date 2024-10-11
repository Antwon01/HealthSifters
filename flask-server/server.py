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


if __name__ == "__main__":
    app.run(debug=True, port="8080")