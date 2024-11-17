package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Menu;
import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;
import com.ua.ies.proj.app.repos.MenuRepository;
import com.ua.ies.proj.app.repos.OrderRepository;


@Service
public class OrderService {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final MenuRepository menuRepository;

    @Autowired
    private final Statistics statistics;

    public OrderService(OrderRepository orderRepository, Statistics statistics, MenuRepository menuRepository) {
        this.orderRepository = orderRepository;
        this.statistics = statistics;
        this.menuRepository = menuRepository;
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
        return statistics.processAllChainsData(rawData);
    }

    public List<Menu> getMenuStatistics() {
        return menuRepository.getMenuStatistics();
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