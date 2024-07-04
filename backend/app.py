from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to MySQL database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="aiga",
    database="foodikdb"
)

def get_cursor():
    return mydb.cursor()

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phoneNumber = data.get('phoneNumber')


    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    cursor = get_cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user:
        return jsonify({'error': 'Username already exists. Please choose a different one.'}), 409

    cursor.execute("INSERT INTO users (username, password, email, phoneNumber) VALUES (%s, %s, %s, %s)", (username, password, email, phoneNumber))
    mydb.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    cursor = get_cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cursor.fetchone()

    if not user:
        return jsonify({'error': 'Invalid username or password'}), 401

    # Return user information upon successful login
    return jsonify({'message': 'Login successful', 'user': {'id': user[0], 'username': user[1]}}), 200

if __name__ == '__main__':
    app.run(debug=True)
