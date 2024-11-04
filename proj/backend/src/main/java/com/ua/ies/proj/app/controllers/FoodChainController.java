package com.ua.ies.proj.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.services.OrderService;
import com.ua.ies.proj.app.services.RestaurantsService;

@RestController
@RequestMapping("/api/v1/foodchains")
public class FoodChainController {
    @Autowired
    private final RestaurantsService restaurantsService;

    @Autowired
    private final OrderService orderService;

    public FoodChainController(RestaurantsService restaurantsService, OrderService orderService) {
        this.restaurantsService = restaurantsService;
        this.orderService = orderService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Foodchain>> getFoodchains() {
        List<Foodchain> foodchains = restaurantsService.getFoodchains();
        return new ResponseEntity<>(foodchains, HttpStatus.OK);
    }

    @GetMapping("/{foodchain_id}/restaurants")
    public ResponseEntity<List<Restaurant>> getRestaurantsFromChain(@PathVariable(value = "foodchain_id") Long chainId) {
        List<Restaurant> restaurants = restaurantsService.getRestaurantsFromChain(chainId);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }

    @GetMapping("/{foodchain_id}/restaurants/{restaurant_id}")
    public ResponseEntity<Restaurant> getRestaurantFromChainById(@PathVariable(value = "foodchain_id") Long chainId, @PathVariable(value = "restaurant_id") Long restId) {
        Restaurant res = restaurantsService.getRestaurantFromChainById(chainId, restId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{foodchain_id}/menus")
    public ResponseEntity<List<Menu>> getMenusByChain(@PathVariable(value = "foodchain_id") Long chainId) {
        List<Menu> menus = restaurantsService.getMenusByChain(chainId);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @GetMapping("/{foodchain_id}/orders/statistics")
    public ResponseEntity<Map<Long, List<Integer>>> getStatistics(@PathVariable(value = "foodchain_id") Long chainId) {
        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        Map<Long, List<Integer>> stats = orderService.getTop5MenusTrendForLast10MinutesByChainId(chainId);
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }
}
