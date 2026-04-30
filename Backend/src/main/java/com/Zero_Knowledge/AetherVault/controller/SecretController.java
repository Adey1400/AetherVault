package com.Zero_Knowledge.AetherVault.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Zero_Knowledge.AetherVault.Entity.Secret;
import com.Zero_Knowledge.AetherVault.Entity.User;
import com.Zero_Knowledge.AetherVault.Repository.SecretRepository;
import com.Zero_Knowledge.AetherVault.Repository.UserRepository;

@RestController
@RequestMapping("/api/secrets")
public class SecretController {
    
    @Autowired
    private SecretRepository secretRepository;
    
    @Autowired
    private UserRepository userRepository;

   //retrieving authenticated user
    private User getAuthenticatedUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        return userRepository.findByEmail(email)
               .orElseThrow(()-> new RuntimeException("User Not Found"));
    }
    //Fetching the user's secret
    @GetMapping
    public ResponseEntity<List<Secret>> getUserSecrets(){
        User user = getAuthenticatedUser();
        List<Secret> secrets= secretRepository.findByUser(user);
        return ResponseEntity.ok(secrets);
    }

    //Saving a new encrypted Blob
    @PostMapping
    public ResponseEntity<?> saveSecret(@RequestBody Map<String,String> payload){
    User user =getAuthenticatedUser();
    String title= payload.get("title");
    String encryptedBlob = payload.get("encryptedBlob");
    
    if (title == null || encryptedBlob == null) {
            return ResponseEntity.badRequest().body("Title and Encrypted Blob are required.");
        }

    Secret newSecret= Secret.builder()
    .title(title)
    .encryptedBlob(encryptedBlob)
    .user(user)
    .build();
    secretRepository.save(newSecret);
    return ResponseEntity.ok(Map.of("message","Secret saved successfully (and blindly!)."));
    }
}
