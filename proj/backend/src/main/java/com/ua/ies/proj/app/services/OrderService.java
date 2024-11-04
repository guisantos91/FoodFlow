package com.ua.ies.proj.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;
import com.ua.ies.proj.app.repos.OrderRepository;


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

    public OrderStatisticsDTO getStatisticsByChainId(Long foodchainId) {
        List<Object[]> rawData = orderRepository.getStatisticsByChainId(foodchainId);
        return statistics.processOrderData(rawData);
    }

    public OrderStatisticsDTO getStatisticsByRestaurantId(Long restaurantId) {
        List<Object[]> rawData = orderRepository.getStatisticsByRestaurantId(restaurantId);
        return statistics.processOrderData(rawData);
    }
}