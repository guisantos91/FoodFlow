package com.ua.ies.proj.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.KafkaUtils.KafkaListenerService;
import com.ua.ies.proj.app.repos.OrderRepository;

@Service
public class OrderProcessingService {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private KafkaListenerService kafkaListenerService;

    public OrderProcessingService(OrderRepository orderRepository, KafkaListenerService kafkaListenerService) {
        this.orderRepository = orderRepository;
    }

    public void createConsumer(String topic) {
        kafkaListenerService.createAndRegisterListener(topic);
    }

    
}
