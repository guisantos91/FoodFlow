package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.repos.OrderRepository;

import jakarta.persistence.Tuple;

@Service
public class OrderService {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final Statistics statistics;

    public OrderService(OrderRepository orderRepository, Statistics statistics) {
        this.orderRepository = orderRepository;
        this.statistics = statistics;
    }

    public List<Order> getRestaurantOrders(Long restaurant_id, String status) {
        if (status == null) {
            return orderRepository.findByRestaurantId(restaurant_id);
        } else {
            return orderRepository.findByRestaurantIdAndStatus(restaurant_id, status);
        }
    }

    public Map<Long, List<Integer>> getTop5MenusTrendForLast10MinutesByChainId(Long foodchainId) {
        List<Tuple> rawData = orderRepository.findTop5MenusTrendForLast10MinutesByChainId(foodchainId);
        return statistics.processOrderData(rawData);
    }

    public Map<Long, List<Integer>> getTop5MenusTrendForLast10MinutesByRestaurantId(Long restaurantId) {
        return null;
    }
}