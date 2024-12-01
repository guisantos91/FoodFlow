import sys
import sys, types

m = types.ModuleType('kafka.vendor.six.moves', 'Mock module')
setattr(m, 'range', range)
sys.modules['kafka.vendor.six.moves'] = m


from kafka import KafkaProducer
from kafka.errors import KafkaError
from datetime import datetime, timedelta
import json
import random
import time
import os

DATA_DIR = '/app/data'
ORDER_ID_FILE = os.path.join(DATA_DIR, 'order_id.txt')
ORDERS_FILE = os.path.join(DATA_DIR, 'orders.json')

os.makedirs(DATA_DIR, exist_ok=True)

# Initialize order_id and orders
if not os.path.exists(ORDER_ID_FILE):
    order_id = 0
else:
    with open(ORDER_ID_FILE, 'r') as f:
        order_id = int(f.read())

if not os.path.exists(ORDERS_FILE):
    orders = {}
else:
    with open(ORDERS_FILE, 'r') as f:
        orders = json.load(f)

kafka_container = os.environ.get('KAFKA_CONTAINER')
kafka_listener_port = os.environ.get('KAFKA_LISTENER_PORT')

producer = KafkaProducer(
    bootstrap_servers=[f'{kafka_container}:{kafka_listener_port}'],
    value_serializer=lambda m: json.dumps(m).encode() 
)

states=['to-do', 'in-progress', 'done','delivered']
foodchains = [
    (1, "McDonald's", "Burgers"),
    (2, "Burger King", "Burgers"),
    (3, "KFC", "Fried Chicken"),
    (4, "Pizza Hut", "Pizza"),
    (5, "Taco Bell", "Mexican Food"),
    (6, "Domino's Pizza", "Pizza"),
    (7, "Telepizza", "Pizza")
]

restaurants = [
    (1, "McDonald's Pingo Doce", "Rua Feira Hipermercados, 3800-000 Aveiro", 40.6519812362783, -8.620476728835527, 1),
    (2, "McDonald's Universidade", "Rua das Pombas, 3810-150 Aveiro", 40.63260134516651, -8.649728523856686, 1),
    (3, "Burger King Forum", "Forum Aveiro, 3800-000 Aveiro", 40.638333, -8.653679, 2),
    (4, "Burger King Glicínias", "Av. Dr. Lourenço Peixinho, 3800-000 Aveiro", 40.643154, -8.650535, 2),
    (5, "KFC Centro", "Rua de Coimbra, 3000-000 Coimbra", 40.205641, -8.419551, 3),
    (6, "Pizza Hut NorteShopping", "R. Sara Afonso 105, 4460-841 Porto", 41.176760, -8.623547, 4),
    (7, "Taco Bell Lisboa", "Rua Augusta 100, 1100-053 Lisboa", 38.710507, -9.137789, 5),
    (8, "Domino's Porto Centro", "Rua de Santa Catarina, 4000-000 Porto", 41.1485, -8.611, 6),
    (9, "Telepizza Faro", "R. de Faro 50, 8000-000 Faro", 37.0194, -7.93044, 7)
]

#Topic to all restaurants
restaurantsTopic={
    1:"McDonald1",
    2:"McDonald2",
    3:"Burger3",
    4:"Burger4",
    5:"KFC5",
    6:"Pizza6",
    7:"Taco7",
    8:"Domino8",
    9:"Telepizza9",
}

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

def generate_order(foodchain_id):
    menus_to_order = {}
    num_menus = random.randint(1, 3)
    possible_menus = [k for k, v in menus.items() if v[2] == foodchain_id]
    chosen_menus = random.choices(possible_menus, k=num_menus)
    for i in chosen_menus:
        menus_to_order[i] = random.randint(1, 2)  
    return menus_to_order

def insert_order():
    foodchain_id = random.choice([cadeia[0] for cadeia in foodchains])
    restaurant = random.choice([r for r in restaurants if r[5] == foodchain_id])  
    restaurant_id = restaurant[0]
    items = generate_order(foodchain_id)
    total_price = sum(menus[item_id][1] * quantity for item_id, quantity in items.items())
    status = 'to-do'
    created_at = datetime.now()  

    global order_id, orders
    order_id += 1

    msg={"order_id":order_id, "restaurant_id":restaurant_id, "created_at":created_at.isoformat(), "price":total_price,"menus":[{"id":menu_id} for menu_id, quantity in items.items()], "status":status}
    print(f"Msg: {msg}")
    topic=restaurantsTopic[restaurant_id]
    producer.send(topic, msg)

    timeToNextState=[created_at+timedelta(seconds=2*random.randint(2,8))]
    timeToNextState.append(timeToNextState[0]+timedelta(seconds=8*random.randint(2,8)))
    timeToNextState.append(timeToNextState[1]+timedelta(seconds=2*random.randint(2,8)))
    
    orders[str(order_id)]={ "restaurant_id":restaurant_id, "created_at":created_at, "price":total_price, "status":status,
    "menus":[{"id":menu_id} for menu_id, quantity in items.items()],
     "timeToNextState":timeToNextState}
    
    with open(ORDER_ID_FILE, 'w') as f:
        f.write(str(order_id))
    
    with open(ORDERS_FILE, 'w') as f:
        json.dump(orders, f)

stateDic={'to-do':0, 'in-progress':1, 'done':2}

def nextState():
    ignores=[]
    for ID,value in orders.items():
        state=stateDic[value["status"]]
        if value["timeToNextState"][state]<datetime.now():
            value["status"]=states[state+1]
            msg={"order_id":ID, "restaurant_id":value["restaurant_id"], "created_at":value["created_at"].isoformat(), "price":value["price"],"menus":value["menus"], "status":value["status"]}
            print(f"Msg: {msg}")
            topic=restaurantsTopic[value["restaurant_id"]]
            producer.send(topic, msg)
            print("Order next successfully.")
        if value["status"]=='delivered':
            ignores.append(ID)
    for i in ignores:
        orders.pop(i)
    
    with open(ORDERS_FILE, 'w') as f:
        json.dump(orders, f)   

try:
    while True:
        try:    
            insert_order()
        except KafkaError as e:
            print(f"Error: {e}")
        print("Order entered successfully.")
        nextState()
        time.sleep(0.2)
except KeyboardInterrupt:
    producer.flush()
    print(len(orders))
    print("Process stopped.")
