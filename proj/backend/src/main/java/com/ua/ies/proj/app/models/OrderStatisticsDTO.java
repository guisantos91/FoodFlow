package com.ua.ies.proj.app.models;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class OrderStatisticsDTO {
    private Map<String, List<Integer>> menuStatistics;

    public OrderStatisticsDTO() {
    }

    public Map<String, List<Integer>> getMenuStatistics() {
        return menuStatistics;
    }

    public void setMenuStatistics(Map<String, List<Integer>> menuStatistics) {
        this.menuStatistics = menuStatistics;
    }
}