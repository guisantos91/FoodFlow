package com.ua.ies.proj.app.services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.MenuInfo;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;

@Service
public class Statistics {
    private int LIMIT;

    public Statistics() {
        this.LIMIT = 5;
    }

    public void setLIMIT(int LIMIT) {
        this.LIMIT = LIMIT;
    }

    public int getLIMIT() {
        return LIMIT;
    }

    public Map<String, OrderStatisticsDTO> processOrderData(List<Object[]> results, boolean allChains) {
        if (results.isEmpty()) {
            return new HashMap<>();
        }


        Map<String, OrderStatisticsDTO> orderStatistics = new HashMap<>();
        results.forEach(row -> {
            String menuName = (String) row[0];
            if (!orderStatistics.containsKey(menuName)) {
                Long id = (Long) row[1];
                double price = (double) row[2];
                MenuInfo menu_info = new MenuInfo(id, menuName, price);
                OrderStatisticsDTO orderStat = new OrderStatisticsDTO(menu_info, new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0)));
                orderStatistics.put(menuName, orderStat);
            }

        });

        for (Object[] row : results) {
            String menuName = (String) row[0];
            Long id = (Long) row[1];
            double price = (double) row[2];
            MenuInfo menu_info = new MenuInfo(id, menuName, price);
            Date bucket = Date.from((Instant) row[3]);
            Integer orderCount = ((Number) row[4]).intValue();

            OrderStatisticsDTO orderStat = orderStatistics.get(menuName);
            List<Integer> values = orderStat.getValues();
            int minuteIndex = calculateMinuteIndex(bucket);
            values.set(minuteIndex, orderCount);
            OrderStatisticsDTO newOrderStat = new OrderStatisticsDTO(menu_info, values);
            orderStatistics.put(menuName, newOrderStat);
        }
        
        if (!allChains) {
            return filterTopMenusByNowOrders(orderStatistics);
        } else {
            return orderStatistics;
        }
    }

    private int calculateMinuteIndex(Date bucket) {
        long minutesAgo = (new Date().getTime() - bucket.getTime()) / (60 * 1000);
        return (int) (5 - minutesAgo);
    }

    public Map<String, OrderStatisticsDTO> filterTopMenusByNowOrders(Map<String, OrderStatisticsDTO> orderStatistics) {
        return orderStatistics.entrySet().stream()
                .sorted((e1, e2) -> Integer.compare(
                        e2.getValue().getValues().get(4), 
                        e1.getValue().getValues().get(4)))
                .limit(LIMIT)
                .collect(HashMap::new, (m, e) -> m.put(e.getKey(), e.getValue()), HashMap::putAll);
    }

    // public Map<String, OrderStatisticsDTO> filterTopMenusByFoodChain(Map<String, OrderStatisticsDTO> orderStatistics) {
    //     Map<Long, OrderStatisticsDTO> topMenusByChain = new HashMap<>();

    //     orderStatistics.forEach((menuName, orderStat) -> {
    //         Long foodChainId = orderStat.getMenu().getFoodchain().getId();
    //         if (!topMenusByChain.containsKey(foodChainId) || 
    //             topMenusByChain.get(foodChainId).getValues().get(4) < orderStat.getValues().get(4)) {
    //             topMenusByChain.put(foodChainId, orderStat);
    //         }
    //     });

    //     Map<String, OrderStatisticsDTO> result = new HashMap<>();
    //     topMenusByChain.forEach((foodChainId, orderStat) -> {
    //         result.put(orderStat.getMenu().getName(), orderStat);
    //     });

    //     return result;
    // }
}



