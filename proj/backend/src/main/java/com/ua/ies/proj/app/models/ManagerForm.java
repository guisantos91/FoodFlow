package com.ua.ies.proj.app.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

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

	@NotBlank
	private String restaurantName;

	@NotBlank
	private String restaurantAddress;

	@NotBlank
	private long latitude;

	@NotBlank
	private long longitude;

	public ManagerForm() {
	}

	public ManagerForm(Foodchain foodchain, String fname, String lname, String email, String restaurantName, String restaurantAddress, long latitude, long longitude) {
		this.foodchain = foodchain;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.restaurantName = restaurantName;
		this.restaurantAddress = restaurantAddress;
		this.latitude = latitude;
		this.longitude = longitude;
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

	public long getLatitude() {
		return latitude;
	}

	public long getLongitude() {
		return longitude;
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

	public void setLatitude(long latitude) {
		this.latitude = latitude;
	}

	public void setLongitude(long longitude) {
		this.longitude = longitude;
	}
}
