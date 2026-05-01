package com.Zero_Knowledge.AetherVault.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Zero_Knowledge.AetherVault.Entity.Secret;
import com.Zero_Knowledge.AetherVault.Entity.User;
import com.Zero_Knowledge.AetherVault.Repository.SecretRepository;
import com.Zero_Knowledge.AetherVault.Repository.UserRepository;
import com.Zero_Knowledge.AetherVault.service.UserService;

@RestController
@RequestMapping("/api/secrets")
public class SecretController {
    
    @Autowired
    private SecretRepository secretRepository;
    


    @Autowired
    private UserService userService;
    //Fetching the user's secret
    @GetMapping
    public ResponseEntity<List<Secret>> getUserSecrets(){
        User user = userService.getAuthenticatedUser();
        List<Secret> secrets= secretRepository.findByUser(user);
        return ResponseEntity.ok(secrets);
    }

    //Saving a new encrypted Blob
    @PostMapping
    public ResponseEntity<?> saveSecret(@RequestBody Map<String,String> payload){
    User user =userService.getAuthenticatedUser();
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

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSecret(@PathVariable Long id) {
        User user = userService.getAuthenticatedUser();
        Secret secret = secretRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Secret not found"));

        // Ensure the secret belongs to the authenticated user!
        if (!secret.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Unauthorized to delete this secret.");
        }

        secretRepository.delete(secret);
        return ResponseEntity.ok(Map.of("message", "Secret deleted successfully."));
    }
}
