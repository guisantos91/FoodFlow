package com.ua.ies.proj.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.services.RestaurantService;

@RestController
@RequestMapping("/api")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/restaurants/{foodchain_id}")
    public List<Restaurant> getRestaurantsFromChain(@PathVariable(value = "foodchain_id") Long chainId, @RequestParam(value = "id", required = false) Long restId) {
        if (restId != null) {
            return restaurantService.getRestaurantsFromChainById(chainId, restId);
        }
        return restaurantService.getRestaurantsFromChain(chainId);
    }

    @GetMapping("/foodchains")
    public List<Foodchain> getFoodchains() {
        return restaurantService.getFoodchains();
    }

    @GetMapping("/menus")
    public List<Menu> getMenusByRestaurant(@RequestParam(value = "restaurant_id", required = true) Long restId) {
        return restaurantService.getMenusByRestaurant(restId);
    }
}