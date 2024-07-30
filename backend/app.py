from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

# Environment variables for database connection
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'root')
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

@app.route('/menus', methods=['POST', 'GET'])
def manage_menus():
    if request.method == 'POST':
        data = request.json
        name = data.get('name')

        if not name:
            return jsonify({'error': 'Menu name is required'}), 400

        try:
            mydb = get_db_connection()
            cursor = mydb.cursor()
            cursor.execute("INSERT INTO menus (name) VALUES (%s)", (name,))
            menu_id = cursor.lastrowid
            mydb.commit()
            cursor.close()
            mydb.close()
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500

        return jsonify({'message': 'Menu added successfully', 'id': menu_id}), 201

    elif request.method == 'GET':
        try:
            mydb = get_db_connection()
            cursor = mydb.cursor(dictionary=True)
            cursor.execute("SELECT * FROM menus")
            menus = cursor.fetchall()
            cursor.close()
            mydb.close()
            return jsonify(menus), 200
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500
    elif request.method== 'DELETE':
        try:
            mydb = get_db_connection()
            cursor = mydb.cursor(dictionary=True)
            cursor.execute("SELECT * FROM menus")
            menus = cursor.fetchall()
            cursor.close()
            mydb.close()
            return jsonify(menus), 200
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500


@app.route('/categories', methods=['POST', 'GET'])
def manage_categories():
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        menu_id = data.get('menu_id')

        if not name or not menu_id:
            return jsonify({'error': 'Category name and menu ID are required'}), 400

        try:
            mydb = get_db_connection()
            cursor = mydb.cursor()
            cursor.execute("INSERT INTO categories (name, menu_id) VALUES (%s, %s)", (name, menu_id))
            category_id = cursor.lastrowid
            mydb.commit()
            cursor.close()
            mydb.close()
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500

        return jsonify({'message': 'Category added successfully', 'id': category_id}), 201

    elif request.method == 'GET':
        try:
            mydb = get_db_connection()
            cursor = mydb.cursor(dictionary=True)
            cursor.execute("SELECT * FROM categories")
            categories = cursor.fetchall()
            cursor.close()
            mydb.close()
            return jsonify(categories), 200
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500

@app.route('/food_items', methods=['POST'])
def add_food_item():
    data = request.json
    name = data.get('name')
    price = data.get('price')
    quantity = data.get('quantity')
    description = data.get('description')
    category_id = data.get('category_id')

    if not name or price is None or quantity is None or not category_id:
        return jsonify({'error': 'Food item name, price, quantity, and category ID are required'}), 400

    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()
        cursor.execute(
            "INSERT INTO food_items (name, price, quantity, description, category_id) VALUES (%s, %s, %s, %s, %s)",
            (name, price, quantity, description, category_id)
        )
        food_item_id = cursor.lastrowid
        mydb.commit()
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'Food item added successfully', 'id': food_item_id}), 201

@app.route('/menus_with_items', methods=['GET'])
def get_menus_with_items():
    try:
        mydb = get_db_connection()
        cursor = mydb.cursor(dictionary=True)
        cursor.execute("""
            SELECT m.id AS menu_id, m.name AS menu_name, 
                   c.id AS category_id, c.name AS category_name, 
                   fi.id AS food_item_id, fi.name AS food_item_name, fi.price, fi.quantity, fi.description
            FROM menus m
            LEFT JOIN categories c ON m.id = c.menu_id
            LEFT JOIN food_items fi ON c.id = fi.category_id
        """)
        rows = cursor.fetchall()

        menus = {}
        for row in rows:
            if row['menu_id'] not in menus:
                menus[row['menu_id']] = {
                    'id': row['menu_id'],
                    'name': row['menu_name'],
                    'categories': {}
                }
            if row['category_id'] not in menus[row['menu_id']]['categories']:
                menus[row['menu_id']]['categories'][row['category_id']] = {
                    'id': row['category_id'],
                    'name': row['category_name'],
                    'items': []
                }
            if row['food_item_id']:
                menus[row['menu_id']]['categories'][row['category_id']]['items'].append({
                    'id': row['food_item_id'],
                    'name': row['food_item_name'],
                    'price': row['price'],
                    'quantity': row['quantity'],
                    'description': row['description']
                })

        cursor.close()
        mydb.close()
        return jsonify(list(menus.values())), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
