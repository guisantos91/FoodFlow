package com.ua.ies.proj.app.KafkaUtils;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.OrderRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

@Component
public class KafkaTemplateListener implements MessageListener<String, Order> {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final RestaurantRepository restaurantRepository;

    public KafkaTemplateListener(OrderRepository orderRepository, RestaurantRepository restaurantRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public void onMessage(ConsumerRecord<String, Order> record) {
        String topic = record.topic();

        Restaurant restaurant = restaurantRepository.findByTopic(topic);

        Order order = record.value();
        order.setRestaurant(restaurant);
        orderRepository.save(order);
    }
}
