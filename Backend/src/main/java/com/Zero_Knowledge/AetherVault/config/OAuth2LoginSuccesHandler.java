package com.Zero_Knowledge.AetherVault.config;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.Zero_Knowledge.AetherVault.Entity.User;
import com.Zero_Knowledge.AetherVault.Repository.UserRepository;
import com.Zero_Knowledge.AetherVault.service.JwtService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2LoginSuccesHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException ,ServletException{
        
        //Extracting the current authenticated user from the Authentication object
        DefaultOAuth2User oAuth2User= (DefaultOAuth2User) authentication.getPrincipal(); 

        //Extracting specific data points
        String email=oAuth2User.getAttribute("email");
        String name=oAuth2User.getAttribute("name");

        // Checking if user exists in our database
        Optional<User> existingUser = userRepository.findByEmail(email);
        
        // If user doesn't exist, register them!
        if(existingUser.isPresent()){
          System.out.println("🚨 Returning user logged in: " + email);
        }else{
            System.out.println("🚨 New user detected! Registering: " + email);
            
            // THE FIX: Using Lombok's Builder Pattern!
            User newUser = User.builder()
                .email(email)
                .name(name)
                .provider("google")
                .isVaultInitialized(false)
                .build();
                
            userRepository.save(newUser);
        }

        //generating jwt
        String token = jwtService.generateToken(email);
        System.out.println("Generated JWT: "+ token);

        //For now, redirect to a custom dashboard endpoint to prove we control the routing.
        response.sendRedirect("http://localhost:5173/oauth2/redirect?token=" + token);
    }
}