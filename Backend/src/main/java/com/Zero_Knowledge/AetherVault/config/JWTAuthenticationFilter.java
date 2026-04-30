package com.Zero_Knowledge.AetherVault.config;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import com.Zero_Knowledge.AetherVault.Entity.User;
import com.Zero_Knowledge.AetherVault.Repository.UserRepository;
import com.Zero_Knowledge.AetherVault.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;


@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
@Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        // 1. Extract the Authorization header
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 2. If the header is missing or doesn't start with "Bearer ", move to the next filter
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try{
        // 3. Extract the actual token (skip the first 7 characters: "Bearer ")
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractEmail(jwt);

        // 4. If we found an email, and the user isn't already authenticated in this thread
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            Optional<User> user = userRepository.findByEmail(userEmail);

            // 5. If the user exists in DB and the math on the token signature checks out
            if (user.isPresent() && jwtService.isTokenValid(jwt, userEmail)) {
                
                // 6. Create a Spring Security Authentication token
                // We pass emptyList() because we haven't set up roles (ADMIN/USER) yet
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userEmail, null, Collections.emptyList()
                );
                
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 7. Force the user into the Security Context!
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }else {
                    System.out.println("🚨 [JWT FILTER FAILED] Token valid math failed, or user not in DB.");
                }
            }
        }catch(Exception e){
            // If the token is expired, tampered with, or malformed, it crashes here!
            System.out.println("🚨 [JWT FILTER CRASHED] Error parsing token: " + e.getMessage());
        }
        
        // 8. Continue the filter chain
        filterChain.doFilter(request, response);
    }
}

