package com.Zero_Knowledge.AetherVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.Zero_Knowledge.AetherVault.Entity.User;
import com.Zero_Knowledge.AetherVault.Repository.UserRepository;

@Service
public class UserService {
 @Autowired
 private UserRepository userRepository;

 
   //retrieving authenticated user
    public User getAuthenticatedUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        return userRepository.findByEmail(email)
               .orElseThrow(()-> new RuntimeException("User Not Found"));
    }
}
