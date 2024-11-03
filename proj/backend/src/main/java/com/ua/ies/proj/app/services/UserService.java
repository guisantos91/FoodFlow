package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import com.ua.ies.proj.app.repos.UserRepository;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ManagerFormRepository managerFormRepository;

    public UserService(UserRepository userRepository, ManagerFormRepository managerFormRepository) {
        this.userRepository = userRepository;
        this.managerFormRepository = managerFormRepository;
    }

    public List<UserManager> getManagers() {
        return userRepository.findAllBy();
    }

    public UserManager getManagerById(Long manager_id) {
        Optional<UserManager> optional_manager = userRepository.findManagerById(manager_id);
        return optional_manager.get();
    }

    public void deleteManager(Long manager_id) {
        userRepository.deleteById(manager_id);
    }

    public UserManager updateManager(Long manager_id, UserManager manager) {
        manager.setId(manager_id);
        UserManager existingManager = userRepository.findManagerById(manager_id).get();
        existingManager.setFname(manager.getFname());
        existingManager.setLname(manager.getLname());
        existingManager.setEmail(manager.getEmail());
        existingManager.setCredential(manager.getCredential());
        existingManager.setPassword(manager.getPassword());
        existingManager.setBirthDate(manager.getBirthDate());
        UserManager updatedManager = userRepository.save(existingManager);
        return updatedManager;
    }


    public ManagerForm addForm(ManagerForm form) {
        return managerFormRepository.save(form);
    }

}
