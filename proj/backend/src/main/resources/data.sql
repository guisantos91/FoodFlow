INSERT INTO foodchains (name, food_type) VALUES
('McDonald''s', 'Burgers'),
('Burger King', 'Burgers'),
('KFC', 'Fried Chicken'),
('Pizza Hut', 'Pizza'),
('Taco Bell', 'Mexican Food'),
('Domino''s Pizza', 'Pizza'),
('Telepizza', 'Pizza')
ON CONFLICT (name) DO NOTHING;

INSERT INTO menu (name, price, foodchain_id) VALUES
('CBO', 7.5, 1),
('Happy Meal', 4.5, 1),
('Big Mac', 6.0, 1),
('Whopper', 7.0, 2),
('Chicken Fries', 4.0, 2),
('Zinger Burger', 6.5, 3),
('Original Recipe Chicken', 8.0, 3),
('Pepperoni Pizza', 10.0, 4),
('Vegetarian Pizza', 9.0, 4),
('Crunchwrap Supreme', 5.5, 5),
('Taco Supreme', 3.5, 5),
('Cheese Pizza', 8.0, 6),
('Spicy BBQ Pizza', 11.0, 6),
('BBQ Chicken Pizza', 10.5, 7),
('Portuguese Pizza', 10.0, 7)
ON CONFLICT (name) DO NOTHING;

INSERT INTO manager_form (fname, lname, email, birth_date, restaurant_name, restaurant_address, latitude, longitude, restaurant_endpoint, password, state) VALUES
('Bob', 'Brown', 'bob@gmail.com', '1980-01-02', 'Burger King Forum', 'Forum Aveiro, 3800-000 Aveiro', 40.638333, -8.653679, 'Burger3', '123456789', 'accepted'),
('Charlie', 'Smith', 'charlie@gmail.com', '1980-05-11', 'Burger King Glicínias', 'Av. Dr. Lourenço Peixinho, 3800-000 Aveiro', 40.643154, -8.650535, 'Burger4', '123456789', 'accepted'),
('Diana', 'Jones', 'diana@gmail.com', '1980-11-22', 'KFC Centro', 'Rua de Coimbra, 3000-000 Coimbra', 40.205641, -8.419551, 'KFC5', '123456789', 'accepted'),
('Eve', 'Williams', 'eve@gmail.com', '1980-03-15', 'McDonald''s Pingo Doce', 'Rua Feira Hipermercados, 3800-000 Aveiro', 40.6519812362783, -8.620476728835527, 'McDonald1', '123456789', 'accepted'),
('John', 'Brady', 'john@gmail.com', '1980-09-28', 'McDonald''s Universidade', 'Rua das Pombas, 3810-150 Aveiro', 40.63260134516651, -8.649728523856686, 'McDonald2', '123456789', 'accepted')
ON CONFLICT (email) DO NOTHING;


INSERT INTO app_user (fname, lname, user_type, email, birth_date, password) VALUES
('Alice', "Green", "ADMIN", "alice@gmail.com", "1980-01-01", '$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq'),
('Bob', "Brown", "MANAGER", "bob@gmail.com", "1980-01-02", '$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq'),
('Charlie', "Smith", "MANAGER", "charlie@gmail.com", "1980-05-11", '$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq'),
('Diana', "Jones", "MANAGER", "diana@gmail.com", "1980-11-22", '$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq'),
('Eve', "Williams", "MANAGER", "eve@gmail.com", "1980-03-15", '$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq'),
('John', "Brady", "MANAGER", "john@gmail.com", "1980-09-28", '$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq')
ON CONFLICT (email) DO NOTHING;

INSERT INTO restaurant (name, address, latitude, longitude, foodchain_id, manager_id, topic) VALUES
('McDonald''s Pingo Doce', 'Rua Feira Hipermercados, 3800-000 Aveiro', 40.6519812362783, -8.620476728835527, 2, "McDonald1"),
('McDonald''s Universidade', 'Rua das Pombas, 3810-150 Aveiro', 40.63260134516651, -8.649728523856686, 3, "McDonald2"),
('Burger King Forum', 'Forum Aveiro, 3800-000 Aveiro', 40.638333, -8.653679, 4, "Burger3"),
('Burger King Glicínias', 'Av. Dr. Lourenço Peixinho, 3800-000 Aveiro', 40.643154, -8.650535, 5, "Burger4"),
('KFC Centro', 'Rua de Coimbra, 3000-000 Coimbra', 40.205641, -8.419551, 6, "KFC5")
ON CONFLICT (name) DO NOTHING;