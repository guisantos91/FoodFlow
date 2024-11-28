package com.ua.ies.proj.app.KafkaUtils;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.models.Order;

@Component
public class KafkaTemplateListener implements MessageListener<String, Order> {

    @Override
    public void onMessage(ConsumerRecord<String, Order> record) {
        System.out.println("RECORD PROCESSING: " + record);
    }
}
