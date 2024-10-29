# FoodChains, Restaurants & Menus
GET api/foodchains
GET api/restaurants/{foodchain_id}
GET api/restaurants/{foodchain_id}?id={id}
GET api/menus?restaurant_id={id}

# Orders & Statistics
GET api/orders?foodchain={foodchain_id}
GET api/orders/statistics?foodchain={foodchain_id}
GET api/orders?restaurant={restaurant_id}
GET api/orders/statistics?restaurant={restaurant_id}

# Admin 
GET api/admin/managers
GET api/admin/managers/{id}
DELETE api/admin/managers/{id}
PUT api/admin/managers/{id}
POST api/admin/managers

# Authentication
POST api/auth/login
POST api/auth/logout
