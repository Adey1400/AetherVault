package com.Zero_Knowledge.AetherVault.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Zero_Knowledge.AetherVault.Entity.User;
import com.Zero_Knowledge.AetherVault.Repository.UserRepository;
import com.Zero_Knowledge.AetherVault.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService; // Inject your new service

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/initialize-vault")
    public ResponseEntity<?> initializeVault() {
        // One clean line to get the user!
        User user = userService.getAuthenticatedUser(); 
        
        user.setVaultInitialized(true);
        userRepository.save(user);
        
        return ResponseEntity.ok(Map.of("message", "Vault initialized successfully."));
    }
}