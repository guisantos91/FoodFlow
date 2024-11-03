package com.ua.ies.proj.app.models;

import java.util.Date;

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

@Entity(name = "forms")
public class ManagerForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "foodchain_id")
    private Foodchain foodchain;

    @NotNull
    private Date birthDate;

    @NotBlank
    private String Name;

    @NotBlank
    private String Surname;

    @NotBlank
    @Column(unique = true)
    private String restaurantName;

    @NotBlank
    private String Email;

    @NotBlank
    private String City;

    @NotBlank
    private String Address;

        public ManagerForm(Foodchain foodchain, Date birthDate, String Name, String Surname, 
                       String restaurantName, String Email, String City, String Address) {
        this.foodchain = foodchain;
        this.birthDate = birthDate;
        this.Name = Name;
        this.Surname = Surname;
        this.restaurantName = restaurantName;
        this.Email = Email;
        this.City = City;
        this.Address = Address;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Foodchain getFoodchain() {
		return foodchain;
	}

	public void setFoodchain(Foodchain foodchain) {
		this.foodchain = foodchain;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public String getSurname() {
		return Surname;
	}

	public void setSurname(String surname) {
		Surname = surname;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getCity() {
		return City;
	}

	public void setCity(String city) {
		City = city;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

}
