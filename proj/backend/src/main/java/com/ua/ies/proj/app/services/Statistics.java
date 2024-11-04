package com.ua.ies.proj.app.services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import jakarta.persistence.Tuple;

@Component
public class Statistics {

    public Map<Long, List<Integer>> processOrderData(List<Tuple> results) {
        Map<Long, List<Integer>> ordersPerMenu = new HashMap<>();

        // Inicializa a lista de pedidos por menu com 0 para os últimos 3 minutos
        for (Tuple tuple : results) {
            Long menuId = tuple.get("menuId", Long.class);
            Instant bucket = tuple.get("bucket", Instant.class);
            Integer totalOrders = tuple.get("totalOrders", Integer.class);

            // Verifica se a entrada para este menu já existe
            ordersPerMenu.putIfAbsent(menuId, new ArrayList<>(Arrays.asList(0, 0, 0)));

            // Obter o tempo atual
            Instant now = Instant.now();

            // Verifica se o pedido está dentro dos últimos 3 minutos
            if (bucket.isAfter(now.minusSeconds(180))) {
                // Calcula o índice da lista para armazenar o total de pedidos
                int index = (int) ((now.getEpochSecond() - bucket.getEpochSecond()) / 60);

                // Atualiza o total de pedidos para o menu
                ordersPerMenu.get(menuId).set(index, totalOrders);
            }
        }

        return ordersPerMenu;
    }
}



