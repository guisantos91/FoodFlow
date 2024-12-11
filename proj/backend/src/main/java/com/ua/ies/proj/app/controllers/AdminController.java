package com.ua.ies.proj.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ua.ies.proj.app.models.ManagerForm;
import com.ua.ies.proj.app.models.UserManager;
import com.ua.ies.proj.app.services.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/managers/{manager_id}")
    public ResponseEntity<UserManager> getManagerById(@PathVariable("manager_id") Long manager_id) {
        UserManager manager = userService.getManagerById(manager_id);
        return new ResponseEntity<>(manager, HttpStatus.OK);
    }
    

    @DeleteMapping("/managers/{manager_id}")
    public ResponseEntity<String> deleteManager(@PathVariable("manager_id") Long manager_id) {
        userService.deleteManager(manager_id);
        return new ResponseEntity<>("Manager deleted sucessfully", HttpStatus.OK);
    }

    @PutMapping("/managers/{manager_id}")
    public ResponseEntity<UserManager> updateManager(@PathVariable("manager_id") Long manager_id, @RequestBody UserManager manager) {
        UserManager managerUpdated = userService.updateManager(manager_id, manager);
        return new ResponseEntity<>(managerUpdated, HttpStatus.OK);
    }

    @PostMapping("/managers")
    public ResponseEntity<String> approveForm(@RequestBody ManagerForm form) {
        userService.approveForm(form);
        return ResponseEntity.ok("Manager and restaurant created successfully");
    }

    // GET /api/v1/admin/forms
    //      or
    // GET /api/v1/admin/forms?state={state} (accepted, declined, pending, deleted)
    @GetMapping("/forms")
    public ResponseEntity<List<ManagerForm>> getForms(@RequestParam(required = false) String state) {
        List<ManagerForm> forms = userService.getForms(state);
        return new ResponseEntity<>(forms, HttpStatus.OK);
    }

    @GetMapping("/forms/{form_id}")
    public ResponseEntity<ManagerForm> getFormById(@PathVariable("form_id") Long form_id) {
        try {
            ManagerForm form = userService.getFormById(form_id);
            return new ResponseEntity<>(form, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/forms/{form_id}")
    public ResponseEntity<ManagerForm> updateForm(@PathVariable("form_id") Long form_id, @RequestBody ManagerForm form) {
        ManagerForm formUpdated = userService.updateForm(form_id, form);
        return new ResponseEntity<>(formUpdated, HttpStatus.OK);
    }
}
