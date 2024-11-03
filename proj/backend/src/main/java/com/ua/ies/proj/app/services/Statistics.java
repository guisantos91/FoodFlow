package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.ua.ies.proj.app.models.OrderStatisticsDTO;

@Component
public class Statistics {

    public Map<Long, List<Integer>> processOrderData(List<OrderStatisticsDTO> orders) {
        // Agrupa os dados em um mapa onde a chave é o ID do menu e o valor é uma lista de contagens de pedidos por minuto
        return orders.stream()
            .collect(Collectors.groupingBy(
                OrderStatisticsDTO::getMenuId,
                Collectors.mapping(
                    OrderStatisticsDTO::getTotalOrders,
                    Collectors.toList()
                )
            ));
    }
}

