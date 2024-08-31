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

# Helper function to decode token (for demonstration, replace with actual implementation)
def decode_token(token):
    # Placeholder function for token decoding
    # Replace this with actual token decoding logic
    return {'role': 'user'}  # Dummy response, replace with actual token logic

# Role-based access decorator
from functools import wraps

def role_required(role):
    def wrapper(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Token is missing'}), 403

            try:
                user_info = decode_token(token)  # Replace with actual token decoding
                if user_info['role'] != role:
                    return jsonify({'error': 'Unauthorized'}), 403
            except Exception as e:
                return jsonify({'error': str(e)}), 403

            return f(*args, **kwargs)
        return decorated_function
    return wrapper

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phoneNumber = data.get('phoneNumber')
    role = data.get('role', 'user')  # Default to 'user' if not provided

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
            "INSERT INTO users (username, password, email, phoneNumber, role) VALUES (%s, %s, %s, %s, %s)",
            (username, password, email, phoneNumber, role)
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

        # Example response with token and role
        response = {
            'message': 'Login successful',
            'token': 'your_generated_jwt_token_here',  # Replace with actual token generation
            'user': {'id': user[0], 'username': user[1], 'role': user[4]}  # Assuming role is in user[4]
        }
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify(response), 200


@app.route('/user/<string:username>', methods=['GET'])
def get_user(username):
    try:
        mydb = get_db_connection()
        cursor = mydb.cursor(dictionary=True)
        cursor.execute("SELECT username, email, phoneNumber, role FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        mydb.close()

        if not user:
            return jsonify({'error': 'User not found'}), 404

        return jsonify(user), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

@app.route('/user/<string:username>', methods=['PUT'])
def update_user(username):
    data = request.json
    new_username = data.get('username')
    email = data.get('email')
    phoneNumber = data.get('phoneNumber')
    role = data.get('role')

    if not new_username and not email and not phoneNumber and not role:
        return jsonify({'error': 'No data provided to update'}), 400

    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()

        # Build the update query dynamically based on provided fields
        update_fields = []
        update_values = []

        if new_username:
            update_fields.append("username = %s")
            update_values.append(new_username)
        if email:
            update_fields.append("email = %s")
            update_values.append(email)
        if phoneNumber:
            update_fields.append("phoneNumber = %s")
            update_values.append(phoneNumber)
        if role:
            update_fields.append("role = %s")
            update_values.append(role)

        update_values.append(username)

        if not update_fields:
            return jsonify({'error': 'No data provided to update'}), 400

        update_query = f"UPDATE users SET {', '.join(update_fields)} WHERE username = %s"

        cursor.execute(update_query, tuple(update_values))
        mydb.commit()

        if cursor.rowcount == 0:
            return jsonify({'error': 'User not found'}), 404

        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'User updated successfully'}), 200


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

@app.route('/menus/<int:menu_id>', methods=['PUT', 'DELETE'])
def manage_single_menu(menu_id):
    if request.method == 'PUT':
        data = request.json
        name = data.get('name')

        if not name:
            return jsonify({'error': 'Menu name is required'}), 400

        try:
            mydb = get_db_connection()
            cursor = mydb.cursor()
            cursor.execute("UPDATE menus SET name = %s WHERE id = %s", (name, menu_id))
            mydb.commit()
            cursor.close()
            mydb.close()
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500

        return jsonify({'message': 'Menu updated successfully'}), 200

    elif request.method == 'DELETE':
        try:
            mydb = get_db_connection()
            cursor = mydb.cursor()
            cursor.execute("DELETE FROM menus WHERE id = %s", (menu_id,))
            mydb.commit()
            cursor.close()
            mydb.close()
        except mysql.connector.Error as err:
            return jsonify({'error': str(err)}), 500

        return jsonify({'message': 'Menu deleted successfully'}), 200


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
        

@app.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    data = request.json
    name = data.get('name')
    menu_id = data.get('menu_id')

    if not name or not menu_id:
        return jsonify({'error': 'Category name and menu ID are required'}), 400

    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()
        cursor.execute("UPDATE categories SET name = %s, menu_id = %s WHERE id = %s", (name, menu_id, category_id))
        mydb.commit()
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'Category updated successfully'}), 200

@app.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()
        cursor.execute("DELETE FROM categories WHERE id = %s", (category_id,))
        mydb.commit()
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'Category deleted successfully'}), 200

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

@app.route('/food_items/<int:food_item_id>', methods=['PUT'])
def update_food_item(food_item_id):
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
        cursor.execute("""
            UPDATE food_items 
            SET name = %s, price = %s, quantity = %s, description = %s, category_id = %s
            WHERE id = %s
        """, (name, price, quantity, description, category_id, food_item_id))
        mydb.commit()
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'Food item updated successfully'}), 200

@app.route('/food_items/<int:food_item_id>', methods=['DELETE'])
def delete_food_item(food_item_id):
    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()
        cursor.execute("DELETE FROM food_items WHERE id = %s", (food_item_id,))
        mydb.commit()
        cursor.close()
        mydb.close()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({'message': 'Food item deleted successfully'}), 200

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

@app.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        phone_number = data.get('phone_number')
        address = data.get('address')
        payment_method = data.get('payment_method')
        total_price = data.get('total_price')
        payment_status = data.get('payment_status')
        order_items = data.get('order_items', [])
        
        if not all([username, email, total_price]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        
        mydb = get_db_connection()
        cursor = mydb.cursor()
        
        cursor.execute("""
            INSERT INTO orders (username, email, phone_number, address, payment_method, total_price, payment_status, order_items)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (username, email, phone_number, address, payment_method, total_price, payment_status, order_items))
        
        order_id = cursor.lastrowid
        
        mydb.commit()
        cursor.close()
        mydb.close()

        return jsonify({'message': 'Order created successfully', 'order_id': order_id}), 201
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/orders', methods=['GET'])
def get_all_orders():
    try:
        mydb = get_db_connection()
        cursor = mydb.cursor(dictionary=True)

        cursor.execute("""
            SELECT * FROM orders
        """)
        
        orders = cursor.fetchall()
        
        cursor.close()
        mydb.close()

        return jsonify(orders), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/messages', methods=['POST'])
def contact():
    data = request.get_json()

    name = data.get('name')
    number = data.get('number')
    email = data.get('email')
    message = data.get('message')

    if not all([name, number, email, message]):
        return jsonify({'error': 'All fields are required'}), 400

    try:
        mydb = get_db_connection()
        cursor = mydb.cursor()

        insert_query = '''
        INSERT INTO messages (name, number, email, message)
        VALUES (%s, %s, %s, %s)
        '''
        cursor.execute(insert_query, (name, number, email, message))

        mydb.commit()
        cursor.close()
        mydb.close()

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

    return jsonify({
        'name': name,
        'number': number,
        'email': email,
        'message': message
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
