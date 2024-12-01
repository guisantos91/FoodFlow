package com.ua.ies.proj.app.KafkaUtils;

import java.time.Instant;
import java.util.Optional;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderKafkaDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.OrderRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

@Component
public class KafkaTemplateListener implements MessageListener<String, OrderKafkaDTO> {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final RestaurantRepository restaurantRepository;

    public KafkaTemplateListener(OrderRepository orderRepository, RestaurantRepository restaurantRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public void onMessage(ConsumerRecord<String, OrderKafkaDTO> record) {
        String topic = record.topic();

        Restaurant restaurant = restaurantRepository.findByTopic(topic);

        OrderKafkaDTO order = record.value();
        System.out.println("Received order: " + order);
        
        Order newOrder = new Order();
        newOrder.setOrderId(order.getOrderId());
        newOrder.setRestaurant(restaurant);
        newOrder.setCreatedAt(Instant.parse(order.getCreatedAt() + "Z"));
        newOrder.setStatus(order.getStatus());
        newOrder.setPrice(order.getPrice());
        newOrder.setMenus(order.getMenus());

        Optional<Order> existingOrder = orderRepository.findByOrderId(order.getOrderId());
        if (existingOrder.isPresent()) {
            Order existing = existingOrder.get();
            existing.setStatus(order.getStatus());
            System.out.println("Order status updated: " + existing.getStatus());
            orderRepository.save(existing);
        } else {
            System.out.println("New order received: " + order.getOrderId());
            orderRepository.save(newOrder);
        }
    }
}
