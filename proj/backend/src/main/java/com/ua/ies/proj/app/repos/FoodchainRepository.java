package com.ua.ies.proj.app.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.Foodchain;

public interface FoodchainRepository extends JpaRepository<Foodchain, Long> {
}
