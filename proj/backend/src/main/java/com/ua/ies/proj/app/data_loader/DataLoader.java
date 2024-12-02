package com.ua.ies.proj.app.data_loader;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.UserAdmin;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.FoodchainRepository;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import com.ua.ies.proj.app.repos.MenuRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;
import com.ua.ies.proj.app.repos.UserRepository;

@Component
public class DataLoader implements CommandLineRunner{
    private final UserRepository userRepository;   

    private final RestaurantRepository restaurantRepository;

    private final FoodchainRepository foodchainRepository;

    private final ManagerFormRepository managerFormRepository;

    private final MenuRepository menuRepository;


    public DataLoader(UserRepository userRepository, RestaurantRepository restaurantRepository, FoodchainRepository foodchainRepository, ManagerFormRepository managerFormRepository, MenuRepository menuRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.foodchainRepository = foodchainRepository;
        this.managerFormRepository = managerFormRepository;
        this.menuRepository = menuRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Foodchain mcDonalds = new Foodchain("McDonald's", "Burgers");
        Foodchain burgerKing = new Foodchain("Burger King", "Burgers");
        Foodchain kfc = new Foodchain("KFC", "Fried Chicken");
        Foodchain pizzaHut = new Foodchain("Pizza Hut", "Pizza");
        Foodchain tacoBell = new Foodchain("Taco Bell", "Mexican Food");
        Foodchain dominos = new Foodchain("Domino's Pizza", "Pizza");
        Foodchain telepizza = new Foodchain("Telepizza", "Pizza");

        if (!foodchainRepository.findByName("McDonald's").isPresent()) {
            foodchainRepository.save(mcDonalds);
        }

        if (!foodchainRepository.findByName("Burger King").isPresent()) {
            foodchainRepository.save(burgerKing);
        }

        if (!foodchainRepository.findByName("KFC").isPresent()) {
            foodchainRepository.save(kfc);
        }

        if (!foodchainRepository.findByName("Pizza Hut").isPresent()) {
            foodchainRepository.save(pizzaHut);
        }

        if (!foodchainRepository.findByName("Taco Bell").isPresent()) {
            foodchainRepository.save(tacoBell);
        }

        if (!foodchainRepository.findByName("Domino's Pizza").isPresent()) {
            foodchainRepository.save(dominos);
        }

        if (!foodchainRepository.findByName("Telepizza").isPresent()) {
            foodchainRepository.save(telepizza);
        }

        Menu cbo = new Menu("CBO", 7.5, mcDonalds);
        Menu happyMeal = new Menu("Happy Meal", 4.5, mcDonalds);
        Menu bigMac = new Menu("Big Mac", 6.0, mcDonalds);
        Menu whopper = new Menu("Whopper", 7.0, burgerKing);
        Menu chickenFries = new Menu("Chicken Fries", 4.0, burgerKing);
        Menu zingerBurger = new Menu("Zinger Burger", 6.5, kfc);
        Menu originalRecipeChicken = new Menu("Original Recipe Chicken", 8.0, kfc);
        Menu pepperoniPizza = new Menu("Pepperoni Pizza", 10.0, pizzaHut);
        Menu vegetarianPizza = new Menu("Vegetarian Pizza", 9.0, pizzaHut);
        Menu crunchwrapSupreme = new Menu("Crunchwrap Supreme", 5.5, tacoBell);
        Menu tacoSupreme = new Menu("Taco Supreme", 3.5, tacoBell);
        Menu cheesePizza = new Menu("Cheese Pizza", 8.0, dominos);
        Menu spicyBBQPizza = new Menu("Spicy BBQ Pizza", 11.0, dominos);
        Menu bbqChickenPizza = new Menu("BBQ Chicken Pizza", 10.5, telepizza);
        Menu portuguesePizza = new Menu("Portuguese Pizza", 10.0, telepizza);        
        // Insert Menu data
        if (!menuRepository.findByName("CBO").isPresent()) {
            menuRepository.save(cbo);
        }

        if (!menuRepository.findByName("Happy Meal").isPresent()) {
            menuRepository.save(happyMeal);
        }

        if (!menuRepository.findByName("Big Mac").isPresent()) {
            menuRepository.save(bigMac);
        }

        if (!menuRepository.findByName("Whopper").isPresent()) {
            menuRepository.save(whopper);
        }

        if (!menuRepository.findByName("Chicken Fries").isPresent()) {
            menuRepository.save(chickenFries);
        }

        if (!menuRepository.findByName("Zinger Burger").isPresent()) {
            menuRepository.save(zingerBurger);
        }

        if (!menuRepository.findByName("Original Recipe Chicken").isPresent()) {
            menuRepository.save(originalRecipeChicken);
        }

        if (!menuRepository.findByName("Pepperoni Pizza").isPresent()) {
            menuRepository.save(pepperoniPizza);
        }

        if (!menuRepository.findByName("Vegetarian Pizza").isPresent()) {
            menuRepository.save(vegetarianPizza);
        }

        if (!menuRepository.findByName("Crunchwrap Supreme").isPresent()) {
            menuRepository.save(crunchwrapSupreme);
        }

        if (!menuRepository.findByName("Taco Supreme").isPresent()) {
            menuRepository.save(tacoSupreme);
        }

        if (!menuRepository.findByName("Cheese Pizza").isPresent()) {
            menuRepository.save(cheesePizza);
        }

        if (!menuRepository.findByName("Spicy BBQ Pizza").isPresent()) {
            menuRepository.save(spicyBBQPizza);
        }

        if (!menuRepository.findByName("BBQ Chicken Pizza").isPresent()) {
            menuRepository.save(bbqChickenPizza);
        }

        if (!menuRepository.findByName("Portuguese Pizza").isPresent()) {
            menuRepository.save(portuguesePizza);
        }

        // Repeat similar checks for other Menu entries...

        // Insert ManagerForm data
        ManagerForm bob = new ManagerForm(mcDonalds, "Bob", "Brown", "bob@gmail.com", "McDonald's Pingo Doce", "Rua Feira Hipermercados, 3800-000 Aveiro", 40.638333, -8.653679, "McDonald1", "123456789", null, "accepted");
        ManagerForm charlie = new ManagerForm(mcDonalds, "Charlie", "Smith", "charlie@gmail.com", "McDonald''s Universidade", "Rua das Pombas, 3810-150 Aveiro", 40.643154, -8.650535, "McDonald2", "123456789", null, "accepted");
        ManagerForm diana = new ManagerForm(burgerKing, "Diana", "Jones", "diana@gmail.com", "Burger King Forum", "Forum Aveiro, 3800-000 Aveiro", 40.205641, -8.419551, "Burger3", "123456789", null, "accepted");
        ManagerForm eve = new ManagerForm(burgerKing, "Eve", "Williams", "eve@gmail.com", "Burger King Glicínias", "Av. Dr. Lourenço Peixinho, 3800-000 Aveiro", 40.6519812362783, -8.620476728835527, "Burger4", "123456789", null, "accepted");
        ManagerForm john = new ManagerForm(kfc, "John", "Brady", "john@gmail.com", "KFC Centro", "Rua de Coimbra, 3000-000 Coimbra", 40.63260134516651, -8.649728523856686, "KFC5", "123456789", null, "accepted");

        if (!managerFormRepository.findByEmail("bob@gmail.com").isPresent()) {
            managerFormRepository.save(bob);
        }

        if (!managerFormRepository.findByEmail("charlie@gmail.com").isPresent()) {
            managerFormRepository.save(charlie);
        }

        if (!managerFormRepository.findByEmail("diana@gmail.com").isPresent()) {
            managerFormRepository.save(diana);
        }
        
        if (!managerFormRepository.findByEmail("eve@gmail.com").isPresent()) {
            managerFormRepository.save(eve);
        }

        if (!managerFormRepository.findByEmail("john@gmail.com").isPresent()) {
            managerFormRepository.save(john);
        }

    

        // Repeat similar checks for other ManagerForm entries..
        UserAdmin alice = new UserAdmin("Alice", "Green", "alice@gmail.com", "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userBob = new UserManager("Bob", "Brown", "bob@gmail.com", "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userCharlie = new UserManager("Charlie", "Smith", "charlie@gmail.com", "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userDiana = new UserManager("Diana", "Jones", "diana@gmail.com", "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userEve = new UserManager("Eve", "Williams", "eve@gmail.com", "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);
        UserManager userJohn = new UserManager("John", "Brady", "john@gmail.com", "$2b$12$vPaBgZDcvj1fbOB7tX3MH.5.IYVjgRo8IMaO0XH8MG8qTVvdBGCEq", null);

        // Insert User data
        if (!userRepository.findByEmail("alice@gmail.com").isPresent()) {
            userRepository.save(alice);
        }

        if (!userRepository.findByEmail("bob@gmail.com").isPresent()) {
            userRepository.save(userBob);
        }

        if (!userRepository.findByEmail("charlie@gmail.com").isPresent()) {
            userRepository.save(userCharlie);
        }

        if (!userRepository.findByEmail("diana@gmail.com").isPresent()) {
            userRepository.save(userDiana);
        }

        if (!userRepository.findByEmail("eve@gmail.com").isPresent()) {
            userRepository.save(userEve);
        }

        if (!userRepository.findByEmail("john@gmail.com").isPresent()) {
            userRepository.save(userJohn);
        }

        // Insert Restaurant data
        Restaurant restaurant1 = new Restaurant("McDonald's Pingo Doce", "Rua Feira Hipermercados, 3800-000 Aveiro", 40.6519812362783, -8.620476728835527, mcDonalds, userBob, "McDonald1");
        Restaurant restaurant2 = new Restaurant("McDonald's Universidade", "Rua das Pombas, 3810-150 Aveiro", 40.63260134516651, -8.649728523856686, mcDonalds, userCharlie, "McDonald2");
        Restaurant restaurant3 = new Restaurant("Burger King Forum", "Forum Aveiro, 3800-000 Aveiro", 40.638333, -8.653679, burgerKing, userDiana, "Burger3");
        Restaurant restaurant4 = new Restaurant("Burger King Glicínias", "Av. Dr. Lourenço Peixinho, 3800-000 Aveiro", 40.643154, -8.650535, burgerKing, userEve, "Burger4");
        Restaurant restaurant5 = new Restaurant("KFC Centro", "Rua de Coimbra, 3000-000 Coimbra", 40.205641, -8.419551, kfc, userJohn, "KFC5");
        
        if (!restaurantRepository.findByName("McDonald's Pingo Doce").isPresent()) {
            restaurantRepository.save(restaurant1);
        }

        if (!restaurantRepository.findByName("McDonald's Universidade").isPresent()) {
            restaurantRepository.save(restaurant2);
        }

        if (!restaurantRepository.findByName("Burger King Forum").isPresent()) {
            restaurantRepository.save(restaurant3);
        }

        if (!restaurantRepository.findByName("Burger King Glicínias").isPresent()) {
            restaurantRepository.save(restaurant4);
        }

        if (!restaurantRepository.findByName("KFC Centro").isPresent()) {
            restaurantRepository.save(restaurant5);
        }
     
    }
}
