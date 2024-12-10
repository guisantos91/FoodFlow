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
        Foodchain mcDonalds = new Foodchain("McDonald's", "Burgers", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRjLWhWpx9PfbzysffLbMA_DK_8jawJAVHbw&s");
        Foodchain burgerKing = new Foodchain("Burger King", "Burgers", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mwH8D7nmaq8OOj_A5qI4qh4LnXhuJtN5vQ&s");
        Foodchain kfc = new Foodchain("KFC", "Fried Chicken", "https://kfcmenu.net/menu/8-pc-chicken-only.png");
        Foodchain pizzaHut = new Foodchain("Pizza Hut", "Pizza", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vu-wXOPKyXEU51U_QKbHMCfwugN3ExAI_A&s");
        Foodchain tacoBell = new Foodchain("Taco Bell", "Mexican Food", "https://cdn.freebiesupply.com/images/thumbs/2x/taco-bell-logo.png");
        Foodchain dominos = new Foodchain("Domino's Pizza", "Pizza", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5s9iRJd6qbAblgaIm2z0Nh0bTPnNYUJEkVg&s");
        Foodchain telepizza = new Foodchain("Telepizza", "Pizza", "https://play-lh.googleusercontent.com/FCjnJiBLP8BK_rbybv2mbmdlA5cLyJQu9KoXgPb0g3d0T3Z_crLfKJokzmCt5MvlxLa5");

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

        Menu cbo = new Menu("CBO", 7.5, mcDonalds,"https://www.mcdonalds.pt/media/4288/007_cbo_03.png");
        Menu happyMeal = new Menu("Happy Meal", 4.5, mcDonalds, "https://drn10k7huei54.cloudfront.net/TPO-1386.jpg");
        Menu bigMac = new Menu("Big Mac", 6.0, mcDonalds, "https://www.mcdonalds.pt/media/7040/produtos_500x500_bestburgers_big-mac.png");
        Menu whopper = new Menu("Whopper", 7.0, burgerKing, "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8eyyUs2n4nYO7q-8UVWZJPa2b2IlAWFVxv0KUR843fY2NroTebO_ga5__MIZG_qxrk8WUmcmkujh0Ic3snrePb8IZ6dh4blxVqspGuGjJ1ktD34-P7UtjozT87WO70NGqi12O_9LdAD3RZ1tDxz_i3sk97ILRWuMuGOd-TtDxbI96f9KY5_cF/s16000/burger%20whopper%2020.jpg");
        Menu chickenFries = new Menu("Chicken Fries", 4.0, burgerKing, "https://www.onionringsandthings.com/wp-content/uploads/2020/09/crispy-chicken-fries-2.jpg");
        Menu zingerBurger = new Menu("Zinger Burger", 6.5, kfc, "https://images.ctfassets.net/crbk84xktnsl/4zgRg2g2ZRBey10D3qfjyZ/e9f079f486f401b884ad570be0a48af8/Zinger_Burger.png");
        Menu originalRecipeChicken = new Menu("Original Recipe Chicken", 8.0, kfc, "https://topsecretrecipes.com/images/product/kfc-original-recipe-chicken-copycat-recipe.jpg");
        Menu pepperoniPizza = new Menu("Pepperoni Pizza", 10.0, pizzaHut, "https://api.pizzahut.io/v1/content/en-ca/ca-1/images/pizza/pizza.pepperoni-lovers.69f7bdf7b6f50a87eb2886934fe0be9f.1.jpg");
        Menu vegetarianPizza = new Menu("Vegetarian Pizza", 9.0, pizzaHut, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoBaqm24OqgZTW27NJR24Vd35oWVru1eZC3w&s");
        Menu crunchwrapSupreme = new Menu("Crunchwrap Supreme", 5.5, tacoBell, "https://www.thespruceeats.com/thmb/y8zBTf81N6AvcoK1CbSwLLGWvMo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-copycat-crunchwrap-supreme-recipe-7499743-hero-A-1b76ff024b44450db7c0eb72da84d98b.jpg");
        Menu tacoSupreme = new Menu("Taco Supreme", 3.5, tacoBell, "https://www.tacobell.pt/wp-content/uploads/2017/05/tacobell-menu-acos-supreme.jpg");
        Menu cheesePizza = new Menu("Cheese Pizza", 8.0, dominos,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDV-2v7GX7vULnZc5H1b6X7jFROU1hzprHQ&s");
        Menu spicyBBQPizza = new Menu("Spicy BBQ Pizza", 11.0, dominos, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHCwBCaWLbF7CT-CES_UO4bLrgp5EhLoX7dw&s");
        Menu bbqChickenPizza = new Menu("BBQ Chicken Pizza", 10.5, telepizza, "https://d1d8i24om29pt.cloudfront.net/static/mobile/products/pizza-bbq-chicken_orig.png");
        Menu portuguesePizza = new Menu("Portuguese Pizza", 10.0, telepizza, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnb5LmVdElGOnWQic1iNxl304IgrP1CvGb8A&s");        
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
