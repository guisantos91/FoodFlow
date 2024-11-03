package com.ua.ies.proj.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.services.UserService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/form")
    public ResponseEntity<ManagerForm> addForm(@RequestBody ManagerForm form) {
        ManagerForm formAdd = userService.addForm(form);
        return new ResponseEntity<>(formAdd, HttpStatus.OK);
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