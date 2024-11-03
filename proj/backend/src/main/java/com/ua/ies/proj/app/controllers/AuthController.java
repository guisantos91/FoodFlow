package com.ua.ies.proj.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ua.ies.proj.app.repos.UserRepository;
import com.ua.ies.proj.app.services.UserService;
import com.ua.ies.proj.app.repos.ManagerFormRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.User;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final UserService userService;

    public AuthController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/form")
    public ResponseEntity<ManagerForm> postMethodName(@RequestBody ManagerForm form) {
        ManagerForm formAdd = userService.addForm(form);
        return new ResponseEntity<>(formAdd, HttpStatus.CREATED);
    }

    /*
     * @GetMapping("/login")
     * public ResponseEntity<User> authenticateUser(@RequestParam String
     * credential, @RequestParam String password) {
     * }
     * 
     * @GetMapping("/logout")
     */



}