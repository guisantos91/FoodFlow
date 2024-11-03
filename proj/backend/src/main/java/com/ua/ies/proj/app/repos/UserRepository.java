package com.ua.ies.proj.app.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.models.UserManager;

public interface UserRepository extends JpaRepository<User, Long>{
    List<UserManager> findByUserType(String user_type);
    Optional<UserManager> findByIdAndUserType(Long manager_id, String user_type);
}
