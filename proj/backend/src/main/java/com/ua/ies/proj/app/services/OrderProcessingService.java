package com.ua.ies.proj.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.KafkaUtils.KafkaTemplateListener;
import com.ua.ies.proj.app.models.OrderKafkaDTO;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.repos.OrderRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;

import jakarta.annotation.PostConstruct;

@Service
public class OrderProcessingService {
    private final String kafkaGroupId = "kafkaGroupId";
    private final String kafkaListenerId = "kafkaListenerId";
    
    private final KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
    
    private final ConcurrentKafkaListenerContainerFactory<String, OrderKafkaDTO> kafkaListenerContainerFactory;

    private final OrderRepository orderRepository;

    private final RestaurantRepository restaurantRepository;

    @Autowired
    public OrderProcessingService(OrderRepository orderRepository, RestaurantRepository restaurantRepository, KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry, ConcurrentKafkaListenerContainerFactory<String, OrderKafkaDTO> kafkaListenerContainerFactory) {
        this.orderRepository = orderRepository;
        this.restaurantRepository = restaurantRepository;
        this.kafkaListenerEndpointRegistry = kafkaListenerEndpointRegistry;
        this.kafkaListenerContainerFactory = kafkaListenerContainerFactory;
    }

    @PostConstruct
    public void initializeListeners() {
        try {
            List<Restaurant> restaurants = restaurantRepository.findAll();

            for (Restaurant restaurant : restaurants) {
                System.out.println("Creating listener for restaurant: " + restaurant.getName());
                createListenerForRestaurant(restaurant.getTopic(), "group-" + restaurant.getId());
            }
        } catch (Exception e) {
            System.out.println("Error initializing listeners: " + e);
        }
    }

    public void createListenerForRestaurant(String topic, String groupId) {
        ContainerProperties containerProperties = new ContainerProperties(topic);
        containerProperties.setGroupId(groupId);
        containerProperties.setMessageListener(new KafkaTemplateListener(orderRepository, restaurantRepository));
       
        ConcurrentMessageListenerContainer<String, OrderKafkaDTO> container = new ConcurrentMessageListenerContainer<>(kafkaListenerContainerFactory.getConsumerFactory(), containerProperties);
        container.start();
    }


    // public void createAndRegisterListener(String topic) {
    //     KafkaListenerEndpoint listener = createKafkaListenerEndpoint(topic);
    //     kafkaListenerEndpointRegistry.registerListenerContainer(listener, kafkaListenerContainerFactory, true);
    // }

    // private KafkaListenerEndpoint createKafkaListenerEndpoint(String topic) {
    //     MethodKafkaListenerEndpoint<String, Order> kafkaListenerEndpoint = createDefaultMethodKafkaListenerEndpoint(topic);
    //     kafkaListenerEndpoint.setBean(new KafkaTemplateListener(orderRepository, restaurantRepository));
    //     try {
    //         kafkaListenerEndpoint.setMethod(KafkaTemplateListener.class.getMethod("onMessage", ConsumerRecord.class));
    //     } catch (NoSuchMethodException e) {
    //         throw new RuntimeException("Attempt to call a non-existent method " + e);
    //     }
    //     return kafkaListenerEndpoint;
    // }

    // private MethodKafkaListenerEndpoint<String, Order> createDefaultMethodKafkaListenerEndpoint(String topic) {
    //     MethodKafkaListenerEndpoint<String, Order> kafkaListenerEndpoint = new MethodKafkaListenerEndpoint<>();
    //     kafkaListenerEndpoint.setId(generateListenerId());
    //     kafkaListenerEndpoint.setGroupId(kafkaGroupId);
    //     kafkaListenerEndpoint.setTopics(topic);
    //     return kafkaListenerEndpoint;
    // }

    // private String generateListenerId() {
    //     return kafkaListenerId + "-" + UUID.randomUUID();

    // }

    // @PreDestroy
    // public void shutdown() {
    //     kafkaListenerEndpointRegistry.getListenerContainers().forEach(container -> {
    //         container.stop();
    //         kafkaListenerEndpointRegistry.unregisterListenerContainer(container.getListenerId());
    //     });
    // }
}
