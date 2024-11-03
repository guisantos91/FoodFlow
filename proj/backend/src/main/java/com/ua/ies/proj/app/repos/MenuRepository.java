package com.ua.ies.proj.app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByFoodchainId(Long foodchain_id);
}
