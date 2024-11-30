package com.ua.ies.proj.app.KafkaUtils;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpoint;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.config.MethodKafkaListenerEndpoint;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.Order;

import jakarta.annotation.PreDestroy;

@Service
public class KafkaListenerService {
    private final String kafkaGroupId = "kafkaGroupId";
    private final String kafkaListenerId = "kafkaListenerId";
    
    @Autowired
    private KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
    @Autowired
    private KafkaListenerContainerFactory<?> kafkaListenerContainerFactory;

    public void createAndRegisterListener(String topic) {
        KafkaListenerEndpoint listener = createKafkaListenerEndpoint(topic);
        kafkaListenerEndpointRegistry.registerListenerContainer(listener, kafkaListenerContainerFactory, true);
    }

    private KafkaListenerEndpoint createKafkaListenerEndpoint(String topic) {
        MethodKafkaListenerEndpoint<String, Order> kafkaListenerEndpoint = createDefaultMethodKafkaListenerEndpoint(topic);
        kafkaListenerEndpoint.setBean(new KafkaTemplateListener());
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
