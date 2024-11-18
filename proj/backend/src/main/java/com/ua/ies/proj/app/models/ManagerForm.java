package com.ua.ies.proj.app.models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @NotBlank
	private String fname;

	@NotBlank
	private String lname;

	@NotBlank
	private String email;

	private Date birthDate;

	@NotBlank
	private String restaurantName;

	@NotBlank
	private String restaurantAddress;

	@NotNull
	private float latitude;

	@NotNull
	private float longitude;

	@NotBlank
	private String restaurantEndpoint;

	@NotBlank
	private String password;

	public ManagerForm() {
	}

	public ManagerForm(Foodchain foodchain, String fname, String lname, String email, String restaurantName, String restaurantAddress, long latitude, long longitude, String restaurantEndpoint, String password, Date birthDate) {
		this.foodchain = foodchain;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.restaurantName = restaurantName;
		this.restaurantAddress = restaurantAddress;
		this.latitude = latitude;
		this.longitude = longitude;
		this.restaurantEndpoint = restaurantEndpoint;
		this.password = password;
		this.birthDate = birthDate;
	}

	public Long getId() {
		return id;
	}

	public Foodchain getFoodchain() {
		return foodchain;
	}

	public String getFname() {
		return fname;
	}

	public String getLname() {
		return lname;
	}

	public String getEmail() {
		return email;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public String getRestaurantAddress() {
		return restaurantAddress;
	}

	public float getLatitude() {
		return latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public String getRestaurantEndpoint() {
		return restaurantEndpoint;
	}

	public String getPassword() {
		return password;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setFoodchain(Foodchain foodchain) {
		this.foodchain = foodchain;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public void setRestaurantAddress(String restaurantAddress) {
		this.restaurantAddress = restaurantAddress;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public void setRestaurantEndpoint(String restaurantEndpoint) {
		this.restaurantEndpoint = restaurantEndpoint;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
}
