CREATE TABLE IF NOT EXISTS foodchain (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    food_type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS restaurant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    foodchain_id INT REFERENCES foodchain(id)
);

CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    foodchain_id INT REFERENCES foodchain(id)
); 

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurant(id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price NUMERIC NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    menu_id INT REFERENCES menu(id),
    quantity INT NOT NULL
);

SELECT create_hypertable('orders', 'date'); 
