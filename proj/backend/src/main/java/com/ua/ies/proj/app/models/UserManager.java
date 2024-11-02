package com.ua.ies.proj.app.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("MANAGER")
public class UserManager extends User {
    public UserManager() {
    }

    public UserManager(String name) {
        super(name);
    }
    
}
