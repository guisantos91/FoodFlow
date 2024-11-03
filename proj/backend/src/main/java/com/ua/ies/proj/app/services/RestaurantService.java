package com.ua.ies.proj.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.FoodchainRepository;
import com.ua.ies.proj.app.repos.MenuRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodchainRepository foodchainRepository;

    @Autowired
    private MenuRepository menuRepository;

    public List<Restaurant> getRestaurantsFromChain(Long chainId) {
        List<Restaurant> res = new ArrayList<>();
        for (Restaurant rest : restaurantRepository.findAll()) {
            if (rest.getFoodchain().getId() == chainId) {
                res.add(rest);
            }
        }
        return res;
    }

    public List<Restaurant> getRestaurantsFromChainById(Long chainId, Long restId) {
        return List.of(restaurantRepository.findById(restId));
    }

    public List<Foodchain> getFoodchains() {
        return foodchainRepository.findAll();
    }

    public List<Menu> getMenusByRestaurant(Long restId) {
        List<Menu> res = new ArrayList<>();
        List<Menu> menus = menuRepository.findAll();
        Restaurant rest = restaurantRepository.findById(restId);
        for (Menu menu : menus) {
            if (menu.getFoodchain() == rest.getFoodchain()) {
                res.add(menu);
            }
        }
        return res;
    }
}
