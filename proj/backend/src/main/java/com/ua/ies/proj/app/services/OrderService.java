package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Map;

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

    public Map<String, OrderStatisticsDTO> getAllStatistics() {
        List<Object[]> rawData = orderRepository.getAllStatistics();
        return statistics.processOrderData(rawData, true);
    }

    public Map<String, OrderStatisticsDTO> getStatisticsByChainId(Long foodchainId) {
        List<Object[]> rawData = orderRepository.getStatisticsByChainId(foodchainId);
        return statistics.processOrderData(rawData, false);
    }

    public Map<String, OrderStatisticsDTO> getStatisticsByRestaurantId(Long restaurantId) {
        List<Object[]> rawData = orderRepository.getStatisticsByRestaurantId(restaurantId);
        return statistics.processOrderData(rawData, false);
    }
}