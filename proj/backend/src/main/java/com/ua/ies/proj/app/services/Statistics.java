package com.ua.ies.proj.app.services;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.OrderStatisticsDTO;

@Service
public class Statistics {
    private final OrderStatisticsDTO orderStatisticsDTO;

    public Statistics(OrderStatisticsDTO orderStatisticsDTO) {
        this.orderStatisticsDTO = new OrderStatisticsDTO();
    }

    public OrderStatisticsDTO processOrderData(List<Object[]> results) {
        Map<String, List<Integer>> menuStatistics = new HashMap<>();

        // Inicializando um mapa para garantir 5 slots (0s) para cada menu para o caso de ausência de dados
        results.forEach(row -> {
            String menuName = (String) row[0];
            if (!menuStatistics.containsKey(menuName)) {
                menuStatistics.put(menuName, Arrays.asList(0, 0, 0, 0, 0));
            }
        });

        // Populando os dados da query para cada menu
        for (Object[] row : results) {
            String menuName = (String) row[0];
            Date bucket = Date.from((Instant) row[1]);

            Integer orderCount = ((Number) row[2]).intValue();

            List<Integer> counts = menuStatistics.get(menuName);
            int minuteIndex = calculateMinuteIndex(bucket);
            counts.set(minuteIndex, orderCount);
            menuStatistics.put(menuName, counts);
        }
        
        this.orderStatisticsDTO.setMenuStatistics(menuStatistics);
        return this.orderStatisticsDTO;
    }

    private int calculateMinuteIndex(Date bucket) {
        long minutesAgo = (new Date().getTime() - bucket.getTime()) / (60 * 1000);
        return (int) (4 - minutesAgo);
    }
}



