package com.ua.ies.proj.app.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("NORMAL")
public class UserNormal extends User {
    public UserNormal() {
    }

    public UserNormal(String name) {
        super(name);
    }
}
