from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector
import os

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'default_secret_key')
jwt = JWTManager(app)
CORS(app)  # Enable CORS for all routes

users = [{'username': 'admin', 'password': 'admin'}]

# Database connection
db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '',
    'database': 'foodikdb',
    'auth_plugin': 'mysql_native_password',
}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()


def get_database_connection():
    return mysql.connector.connect(**db_config)


# Login
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Use the connection context manager to ensure proper cleanup
        with get_database_connection() as conn:
            with conn.cursor(dictionary=True) as cursor:
                # Replace with your actual login query
                cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
                user = cursor.fetchone()

        if user:
            access_token = create_access_token(identity=username)
            return jsonify({'token': access_token})
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

    except Exception as e:
        print(f"An error occurred during login: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


# Register
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        phone_number = data.get('phoneNumber')

        # Use the connection context manager to ensure proper cleanup
        with get_database_connection() as conn:
            with conn.cursor(dictionary=True) as cursor:
                # Replace with your actual registration query
                cursor.execute("INSERT INTO users (username, password, email, phoneNumber) VALUES (%s, %s, %s, %s)",
                               (username, password, email, phone_number))
                conn.commit()

        access_token = create_access_token(identity=username)
        return jsonify({'token': access_token})

    except Exception as e:
        print(f"An error occurred during registration: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500


if __name__ == '__main__':
    app.run(debug=True)

