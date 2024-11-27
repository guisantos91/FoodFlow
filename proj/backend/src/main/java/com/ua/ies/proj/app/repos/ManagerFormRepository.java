package com.ua.ies.proj.app.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.ManagerForm;

public interface ManagerFormRepository extends JpaRepository<ManagerForm, Long> {
    Optional<ManagerForm> findById(Long id);
}
