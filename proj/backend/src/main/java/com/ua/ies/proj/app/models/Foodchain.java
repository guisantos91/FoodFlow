package com.ua.ies.proj.app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "foodchain")
public class Foodchain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true)
    @NotBlank
    private String name;

    @NotBlank
    private String food_type;

    public Foodchain() {
    }

    public Foodchain(String name, String food_type) {
        this.name = name;
        this.food_type = food_type;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFood_type() {
        return food_type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setFood_type(String food_type) {
        this.food_type = food_type;
    }
}
