import random
import time
import psycopg2
import json
import bcrypt


cadeias = [
    (1, "McDonald's", "Burgers"),
    (2, "Burger King", "Burgers"),
    (3, "KFC", "Fried Chicken"),
    (4, "Pizza Hut", "Pizza"),
    (5, "Taco Bell", "Mexican Food"),
    (6, "Domino's Pizza", "Pizza"),
    (7, "Telepizza", "Pizza")
]


restaurantes = [
    ("McDonald's Pingo Doce", "Rua Feira Hipermercados, 3800-000 Aveiro", 40.6519812362783, -8.620476728835527, 1, 2),
    ("McDonald's Universidade", "Rua das Pombas, 3810-150 Aveiro", 40.63260134516651, -8.649728523856686, 1, 3),
    ("Burger King Forum", "Forum Aveiro, 3800-000 Aveiro", 40.638333, -8.653679, 2, 4),
    ("Burger King Glicínias", "Av. Dr. Lourenço Peixinho, 3800-000 Aveiro", 40.643154, -8.650535, 2, 5),
    ("KFC Centro", "Rua de Coimbra, 3000-000 Coimbra", 40.205641, -8.419551, 3, 3),
    ("Pizza Hut NorteShopping", "R. Sara Afonso 105, 4460-841 Porto", 41.176760, -8.623547, 4, 2),
    ("Taco Bell Lisboa", "Rua Augusta 100, 1100-053 Lisboa", 38.710507, -9.137789, 5, 4),
    ("Domino's Porto Centro", "Rua de Santa Catarina, 4000-000 Porto", 41.1485, -8.611, 6, 5),
    ("Telepizza Faro", "R. de Faro 50, 8000-000 Faro", 37.0194, -7.93044, 7, 2),
]


menus = {
    1: ("CBO", 7.5, 1),
    2: ("Happy Meal", 4.5, 1),
    3: ("Big Mac", 6.0, 1),
    4: ("Whopper", 7.0, 2),
    5: ("Chicken Fries", 4.0, 2),
    6: ("Zinger Burger", 6.5, 3),
    7: ("Original Recipe Chicken", 8.0, 3),
    8: ("Pepperoni Pizza", 10.0, 4),
    9: ("Vegetarian Pizza", 9.0, 4),
    10: ("Crunchwrap Supreme", 5.5, 5),
    11: ("Taco Supreme", 3.5, 5),
    12: ("Cheese Pizza", 8.0, 6),
    13: ("Spicy BBQ Pizza", 11.0, 6),
    14: ("BBQ Chicken Pizza", 10.5, 7),
    15: ("Portuguese Pizza", 10.0, 7)
}

senha = "123456789"
hashed = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

users = [
    ("Alice", "Green", "ADMIN", "alice@gmail.com", "1980-01-01", hashed.decode('utf-8')),
    ("Bob", "Brown", "MANAGER", "bob@gmail.com", "1980-01-02", hashed.decode('utf-8')),
    ("Charlie", "Smith", "MANAGER", "charlie@gmail.com", "1985-05-10", hashed.decode('utf-8')),
    ("Diana", "Jones", "MANAGER", "diana@gmail.com", "1990-11-22", hashed.decode('utf-8')),
    ("Eve", "Williams", "MANAGER", "eve@gmail.com", "1987-03-15", hashed.decode('utf-8')),
]


conn = psycopg2.connect(
    database="foodflow_db_dev",
    host="localhost",
    user="user",
    password="password",
    port=5432
)

cursor = conn.cursor()


def inserir_dados():
    cursor.executemany(
        "INSERT INTO foodchain (id, name, food_type) VALUES (%s, %s, %s) ON CONFLICT (id) DO NOTHING", 
        cadeias
    )
    cursor.executemany(
        "INSERT INTO app_user (fname, lname, user_type, email, birth_date, password) VALUES (%s, %s, %s, %s, %s, %s) ON CONFLICT (id) DO NOTHING", 
        users
    )
    cursor.executemany(
        """
        INSERT INTO restaurant (name, address, latitude, longitude, foodchain_id, manager_id) 
        VALUES (%s, %s, %s, %s, %s, %s) ON CONFLICT (id) DO NOTHING
        """, 
        restaurantes
    )
    for menu_id, (nome, price, cadeia_id) in menus.items():
        cursor.execute(
            "INSERT INTO menu (id, name, price, foodchain_id) VALUES (%s, %s, %s, %s) ON CONFLICT (id) DO NOTHING", 
            (menu_id, nome, price, cadeia_id)
        )

    conn.commit()


def gerar_menu_pedido(cadeia_id):
    menus_to_order = {}
    num_menus = random.randint(1, 3)
    menus_possiveis = [k for k, v in menus.items() if v[2] == cadeia_id]
    menus_escolhidos = random.choices(menus_possiveis, k=num_menus)
    for i in menus_escolhidos:
        menus_to_order[i] = random.randint(1, 2)  
    return menus_to_order
from datetime import datetime


def inserir_pedido():
    cadeia_id = random.choice([cadeia[0] for cadeia in cadeias])
    restaurante = random.choice([r for r in restaurantes if r[4] == cadeia_id])  
    restaurant_id = restaurantes.index(restaurante) + 1
    items = gerar_menu_pedido(cadeia_id)
    total_price = sum(menus[item_id][1] * quantity for item_id, quantity in items.items())
    status = random.choice(['to-do', 'in-progress', 'done'])
    created_at = datetime.now()  

    
    cursor.execute(
        "INSERT INTO orders (restaurant_id, created_at, price, status) VALUES (%s, %s, %s, %s) RETURNING id",
        (restaurant_id, created_at, total_price, status)
    )
    order_id = cursor.fetchone()[0]  

    
    for menu_id, quantity in items.items():
        cursor.execute(
            "INSERT INTO order_items (order_id, menu_id) VALUES (%s, %s)",
            (order_id, menu_id)
        )
    conn.commit()



inserir_dados()


try:
    while True:
        inserir_pedido()
        print("Order entered successfully.")
        time.sleep(0.2)
except KeyboardInterrupt:
    print("Process stopped.")


conn.close()
