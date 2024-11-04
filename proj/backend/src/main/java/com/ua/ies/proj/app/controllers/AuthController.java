package com.ua.ies.proj.app.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.auth.JwtTokenProvider;
import com.ua.ies.proj.app.auth.LoginRequest;
import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.services.UserService;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private final UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping("/form")
    public ResponseEntity<ManagerForm> addForm(@RequestBody ManagerForm form) {
        ManagerForm formAdd = userService.addForm(form);
        return new ResponseEntity<>(formAdd, HttpStatus.OK);
    }

    
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
         try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            
            String role = authentication.getAuthorities().iterator().next().getAuthority();
            String token = jwtTokenProvider.createToken(email, role);
            
            return ResponseEntity.ok("Authenticated Successfully | Token " + token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
    
    // @PostMapping("/logout")
    // public ResponseEntity<String> logoutUser(@RequestParam String token) {
    //     return null;
    // }
}