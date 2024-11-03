package com.ua.ies.proj.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.services.OrderService;


@RestController
@RequestMapping("/api/v1/restaurants")
public class RestaurantController {
    @Autowired
    private final OrderService orderService;

    public RestaurantController(OrderService orderService) {
        this.orderService = orderService;
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
    public ResponseEntity<Map<Long, List<Integer>>> getStatistics(@PathVariable(value = "restaurant_id") Long restaurant_id) {
        Map<Long, List<Integer>> stats = orderService.getTop5MenusTrendForLast10MinutesByRestaurantId(restaurant_id);
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }
}