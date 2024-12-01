package com.ua.ies.proj.app.models;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // This is the order_id that will be sent from the datagenerator
    private Long order_id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @NotNull
    private double price;

    @NotBlank
    private String status;

    @Column(name = "createdAt", nullable = false)
    private Instant createdAt;

    @ManyToMany
    @JoinTable(
        name = "order_items",
        joinColumns = @JoinColumn(name = "order_id"), 
        inverseJoinColumns = @JoinColumn(name = "menu_id") 
    )
    private List<Menu> menus = new ArrayList<>();
       
    public Order() {
    }

    public Order(Restaurant restaurant, double price, String status, List<Menu> menus, Long order_id) {
        this.restaurant = restaurant;
        this.price = price;
        this.status = status;
        this.menus = menus;
        this.order_id = order_id;
    }

    public long getId() {
        return id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public double getPrice() {
        return price;
    }

    public String getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public Long getOrder_id() {
        return order_id;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }

    public void setOrder_id(Long order_id) {
        this.order_id = order_id;
    }
}
