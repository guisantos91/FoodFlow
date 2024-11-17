package com.ua.ies.proj.app.models;

import org.springframework.stereotype.Component;

@Component
public class MenuInfo {
    private Long id;
    private String name;
    private double price;

    public MenuInfo() {
    }

    public MenuInfo(Long id, String name, double price) {
        this.name = name;
        this.price = price;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
