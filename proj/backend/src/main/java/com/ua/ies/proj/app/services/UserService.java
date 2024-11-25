package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;
import com.ua.ies.proj.app.repos.UserRepository;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ManagerFormRepository managerFormRepository;
    @Autowired
    private final RestaurantRepository restaurantRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, ManagerFormRepository managerFormRepository, RestaurantRepository restaurantRepository) {
        this.userRepository = userRepository;
        this.managerFormRepository = managerFormRepository;
        this.restaurantRepository = restaurantRepository;
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
        existingManager.setPassword(manager.getPassword());
        existingManager.setBirthDate(manager.getBirthDate());
        UserManager updatedManager = userRepository.save(existingManager);
        return updatedManager;
    }


    public ManagerForm addForm(ManagerForm form) {
        return managerFormRepository.save(form);
    }

    public List<ManagerForm> getForms() {
        return managerFormRepository.findAll();
    }

    public void deleteForm(Long form_id) {
        managerFormRepository.deleteById(form_id);
    }

    public void approveForm(ManagerForm form) {
        UserManager manager = new UserManager();
        manager.setFname(form.getFname());
        manager.setLname(form.getLname());
        manager.setEmail(form.getEmail());
        manager.setPassword(passwordEncoder.encode(form.getPassword()));
        manager.setBirthDate(form.getBirthDate());
        userRepository.save(manager);

        Restaurant restaurant = new Restaurant();
        restaurant.setName(form.getRestaurantName());
        restaurant.setAddress(form.getRestaurantAddress());
        restaurant.setLatitude(form.getLatitude());
        restaurant.setLongitude(form.getLongitude());
        // Send to the publisher the restaurantEndpoint
        restaurant.setFoodchain(form.getFoodchain());
        restaurant.setManager(manager);
        restaurantRepository.save(restaurant);

    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.get();
    } 
}
