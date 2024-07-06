from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# Environment variables for database connection
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'aiga')
DB_NAME = os.getenv('DB_NAME', 'foodikdb')

# Connect to MySQL database
def get_db_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phoneNumber = data.get('phoneNumber')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user:
            return jsonify({'error': 'Username already exists. Please choose a different one.'}), 409

        cursor.execute(
            "INSERT INTO users (username, password, email, phoneNumber) VALUES (%s, %s, %s, %s)",
            (username, password, email, phoneNumber)
        )
        mydb.commit()
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
        user = cursor.fetchone()

        if not user:
            return jsonify({'error': 'Invalid username or password'}), 401

        response = {
            'message': 'Login successful',
            'user': {'id': user[0], 'username': user[1]}
        }
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
