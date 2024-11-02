package com.ua.ies.proj.app.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ADMIN")
public class UserAdmin extends User {
    public UserAdmin() {
    }

    public UserAdmin(String name) {
        super(name);
    }
}
