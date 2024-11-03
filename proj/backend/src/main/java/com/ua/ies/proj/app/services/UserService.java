package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.UserRepository;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserManager> getManagers() {
        return userRepository.findByUserType("MANAGER");
    }

    public UserManager getManagerById(Long manager_id) {
        Optional<UserManager> optional_manager = userRepository.findByIdAndUserType(manager_id, "MANAGER");
        return optional_manager.get();
    }

    public void deleteManager(Long manager_id) {
        userRepository.deleteById(manager_id);
    }

    public UserManager updateManager(Long manager_id, UserManager manager){
        manager.setId(manager_id);
        UserManager existingManager = userRepository.findByIdAndUserType(manager_id, "MANAGER").get();
        existingManager.setName(manager.getName());
        UserManager updatedManager = userRepository.save(existingManager);
        return updatedManager;
    }

    public UserManager addManager(String name) {
        UserManager user = new UserManager(name);
        return userRepository.save(user);
    }
}
