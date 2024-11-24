package com.ua.ies.proj.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.services.OrderService;
import com.ua.ies.proj.app.services.RestaurantsService;
import com.ua.ies.proj.app.services.UserService;

@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {
    @Autowired
    private final OrderService orderService;

    @Autowired
    private final UserService userService;

    @Autowired
    private final RestaurantsService restaurantService;

    public RestaurantController(OrderService orderService, UserService userService, RestaurantsService restaurantService) {
        this.orderService = orderService;
        this.userService = userService;
        this.restaurantService = restaurantService;
    }

    // GET /api/v1/restaurants/{restaurant_id}/orders
    //      or
    // GET /api/v1/restaurants/{restaurant_id}/orders?status={status}
    // status = "to-do" or "in-progress" or "done"

    @GetMapping("/{restaurant_id}/orders")
    public ResponseEntity<List<Order>> getRestaurantOrders(@PathVariable("restaurant_id") Long restaurant_id ,@RequestParam(required=false) String status) {
        List<Order> orders = orderService.getRestaurantOrders(restaurant_id, status);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{restaurant_id}/orders/statistics")
    public ResponseEntity<Map<String, OrderStatisticsDTO>> getStatistics(@PathVariable(value = "restaurant_id") Long restaurantId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, OrderStatisticsDTO> stats;

        if (isManager(restaurantId, auth)) {
            stats = orderService.getStatisticsByRestaurantId(restaurantId, 3);
        } else {
            stats = orderService.getStatisticsByRestaurantId(restaurantId, 1);
        }
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    private boolean isManager(Long restaurantId, Authentication auth) {
        String email = auth.getName();
        String role = auth.getAuthorities().iterator().next().getAuthority();

        try {
            User user = userService.getUserByEmail(email);
            Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
            return role.equals("MANAGER") && restaurant.getManager().getId().equals(user.getId());
        } catch (Exception e) {
            return false;
        }
    }
 
}