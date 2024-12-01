package com.ua.ies.proj.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank
    private String name;

    @NotNull
    private double price;

    @ManyToOne
    @JoinColumn(name = "foodchain_id")
    private Foodchain foodchain;

    public Menu() {
    }

    public Menu(String name, double price, Foodchain foodchain) {
        this.name = name;
        this.price = price;
        this.foodchain = foodchain;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public Foodchain getFoodchain() {
        return foodchain;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setFoodchain(Foodchain foodchain) {
        this.foodchain = foodchain;
    }
}
