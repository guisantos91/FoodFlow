package com.ua.ies.proj.app.models;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class OrderStatisticsDTO {
    private MenuInfo menu_info;
    private List<Integer> values;

    public OrderStatisticsDTO() {
    }

    public OrderStatisticsDTO(MenuInfo menu_info, List<Integer> values) {
        this.menu_info = menu_info;
        this.values = values;
    }

    public MenuInfo getMenu() {
        return menu_info;
    }

    public void setMenu(MenuInfo menu_info) {
        this.menu_info = menu_info;
    }

    public List<Integer> getValues() {
        return values;
    }

    public void setValues(List<Integer> values) {
        this.values = values;
    }
}