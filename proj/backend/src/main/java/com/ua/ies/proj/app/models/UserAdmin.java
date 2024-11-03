package com.ua.ies.proj.app.models;

import java.util.Date;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ADMIN")
public class UserAdmin extends User {
    public UserAdmin() {
    }

    public UserAdmin(String fname, String lname, String email, Long credential, String password, Date birthDate) {
        super(fname, lname, email, credential, password, birthDate);
    }
}
