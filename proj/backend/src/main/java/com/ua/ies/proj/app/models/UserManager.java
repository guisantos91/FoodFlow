package com.ua.ies.proj.app.models;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("MANAGER")
public class UserManager extends User {
    public UserManager() {
    }

    public UserManager(String fname, String lname, String email, Long credential, String password, Date birthDate) {
        super(fname, lname, email, credential, password, birthDate);
    }
    
}
