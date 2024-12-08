package com.ua.ies.proj.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.Restaurant;
import com.ua.ies.proj.app.models.Foodchain;
import com.ua.ies.proj.app.models.User;
import com.ua.ies.proj.app.models.UserInfo;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import com.ua.ies.proj.app.repos.RestaurantRepository;
import com.ua.ies.proj.app.repos.UserRepository;
import org.springframework.security.core.Authentication;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
    @Autowired
    private final OrderProcessingService orderProcessingService;

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ManagerFormRepository managerFormRepository;
    @Autowired
    private final RestaurantRepository restaurantRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, ManagerFormRepository managerFormRepository, RestaurantRepository restaurantRepository, OrderProcessingService orderProcessingService) {
        this.userRepository = userRepository;
        this.managerFormRepository = managerFormRepository;
        this.restaurantRepository = restaurantRepository;
        this.orderProcessingService = orderProcessingService;
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

    public ManagerForm updateForm(Long form_id, ManagerForm form){
        ManagerForm existingForm = managerFormRepository.findById(form_id).get();
        existingForm.setFname(form.getFname());
        existingForm.setLname(form.getLname());
        existingForm.setEmail(form.getEmail());
        existingForm.setPassword(form.getPassword());
        existingForm.setBirthDate(form.getBirthDate());
        existingForm.setRestaurantName(form.getRestaurantName());
        existingForm.setRestaurantAddress(form.getRestaurantAddress());
        existingForm.setLatitude(form.getLatitude());
        existingForm.setLongitude(form.getLongitude());
        existingForm.setFoodchain(form.getFoodchain());
        existingForm.setState(form.getState());
        ManagerForm updatedForm = managerFormRepository.save(existingForm);
        return updatedForm;
    }


    public ManagerForm addForm(ManagerForm form) {
        form.setState("pending");
        return managerFormRepository.save(form);
    }

    public List<ManagerForm> getForms(String state) {
        if (state != null) {
            return managerFormRepository.findByState(state);
        }
        return managerFormRepository.findAll();
    }

    public ManagerForm getFormById(Long form_id) {
        Optional<ManagerForm> form = managerFormRepository.findById(form_id);
        if (form.isPresent()) {
            return form.get();
        } else {
            throw new EntityNotFoundException("Form not found with id: " + form_id);
        }
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
        restaurant.setFoodchain(form.getFoodchain());
        restaurant.setManager(manager);
        restaurant.setTopic(form.getRestaurantEndpoint());
        restaurantRepository.save(restaurant);

        orderProcessingService.createListenerForRestaurant(restaurant.getTopic(), "group-" + restaurant.getId());

        form.setState("accepted");
        managerFormRepository.save(form);
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.get();
    } 

    public UserInfo getUserInfo(Authentication auth){
        String role = auth.getAuthorities().iterator().next().getAuthority();
        String email = auth.getName();
        UserInfo userInfo = new UserInfo();
        
        userInfo.setRole(role);
        
        User user = getUserByEmail(email);
        userInfo.setFname(user.getFname());
        userInfo.setLname(user.getLname());

        if (role.equals("MANAGER")){
            Restaurant restaurant = restaurantRepository.findByManagerId(user.getId()).get();
            userInfo.setRestaurant_id(restaurant.getId());
            Foodchain foodchain = restaurant.getFoodchain();
            userInfo.setFoodchain_id(foodchain.getId());
        }
        return userInfo;
    }
}
