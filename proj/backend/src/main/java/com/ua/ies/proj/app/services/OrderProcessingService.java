package com.ua.ies.proj.app.services;

import java.util.List;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpoint;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.config.MethodKafkaListenerEndpoint;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.KafkaUtils.KafkaTemplateListener;
import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.OrderRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Service
public class OrderProcessingService {
    private final String kafkaGroupId = "kafkaGroupId";
    private final String kafkaListenerId = "kafkaListenerId";
    
    @Autowired
    private KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
    @Autowired
    private KafkaListenerContainerFactory<?> kafkaListenerContainerFactory;

    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final RestaurantRepository restaurantRepository;

    public OrderProcessingService(OrderRepository orderRepository, RestaurantRepository restaurantRepository) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @PostConstruct
    public void initializeListeners() {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        for (Restaurant restaurant : restaurants) {
            createAndRegisterListener(restaurant.getTopic());
        }
    }

    public void createAndRegisterListener(String topic) {
        KafkaListenerEndpoint listener = createKafkaListenerEndpoint(topic);
        kafkaListenerEndpointRegistry.registerListenerContainer(listener, kafkaListenerContainerFactory, true);
    }

    private KafkaListenerEndpoint createKafkaListenerEndpoint(String topic) {
        MethodKafkaListenerEndpoint<String, Order> kafkaListenerEndpoint = createDefaultMethodKafkaListenerEndpoint(topic);
        kafkaListenerEndpoint.setBean(new KafkaTemplateListener(orderRepository, restaurantRepository));
        try {
            kafkaListenerEndpoint.setMethod(KafkaTemplateListener.class.getMethod("onMessage", ConsumerRecord.class));
        } catch (NoSuchMethodException e) {
            throw new RuntimeException("Attempt to call a non-existent method " + e);
        }
        return kafkaListenerEndpoint;
    }

    private MethodKafkaListenerEndpoint<String, Order> createDefaultMethodKafkaListenerEndpoint(String topic) {
        MethodKafkaListenerEndpoint<String, Order> kafkaListenerEndpoint = new MethodKafkaListenerEndpoint<>();
        kafkaListenerEndpoint.setId(generateListenerId(topic));
        kafkaListenerEndpoint.setGroupId(kafkaGroupId);
        kafkaListenerEndpoint.setTopics(topic);
        return kafkaListenerEndpoint;
    }

    private String generateListenerId(String topic) {
        return kafkaListenerId + "-" + topic;

    }

    @PreDestroy
    public void shutdown() {
        kafkaListenerEndpointRegistry.getListenerContainers().forEach(container -> {
            container.stop();
            kafkaListenerEndpointRegistry.unregisterListenerContainer(container.getListenerId());
        });
    }
}
