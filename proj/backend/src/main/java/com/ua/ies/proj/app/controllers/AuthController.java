package com.ua.ies.proj.app.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private final UserService userService;

    public static final Map<String, String> tokens = new HashMap<>();

    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/form")
    public ResponseEntity<ManagerForm> addForm(@RequestBody ManagerForm form) {
        ManagerForm formAdd = userService.addForm(form);
        return new ResponseEntity<>(formAdd, HttpStatus.OK);
    }

    
    // @PostMapping("/login")
    // public ResponseEntity<String> authenticateUser(@RequestParam String email, @RequestParam String password) {
    //     Authentication authentication = authenticationManager.authenticate(
    //         new UsernamePasswordAuthenticationToken(email, password)
    //     );

    //     SecurityContextHolder.getContext().setAuthentication(authentication);

    //     String token = UUID.randomUUID().toString();
    //     tokens.put(token, email);

    //     return new ResponseEntity<>("User logged in!", HttpStatus.OK);
    // }
    
    // @PostMapping("/logout")
    // public ResponseEntity<String> logoutUser(@RequestParam String token) {
    //     if (tokens.containsKey(token)) {
    //         tokens.remove(token);
    //         return new ResponseEntity<>("Logout successful!", HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>("Invalid token", HttpStatus.UNAUTHORIZED);
    // }
}