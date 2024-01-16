from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import mysql.connector

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)
CORS(app) # Enable CORS for all routes

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


# login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = next((user for user in users if user['username'] == username and user['password'] == password), None)
    if user:
        access_token = create_access_token(identity=username)
        return jsonify({'token': access_token})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


# register
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phone_number = data.get('phoneNumber')

    if any(user['username'] == username for user in users):
        return jsonify({'error': 'Username already exists'}), 400

    if any(user.get('email') == email for user in users):
        return jsonify({'error': 'Email already registered'}), 400

    if any(user.get('phoneNumber') == phone_number for user in users):
        return jsonify({'error': 'Phone number already registered'}), 400

    users.append({
        'username': username,
        'password': password,
        'email': email,
        'phoneNumber': phone_number,
    })
    access_token = create_access_token(identity=username)
    return jsonify({'token': access_token})


if __name__ == '__main__':
    app.run(debug=True)

