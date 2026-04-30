package com.Zero_Knowledge.AetherVault.config;



import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
// import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private OAuth2LoginSuccesHandler oAuth2LoginSuccesHandler;

    @Autowired
    private JWTAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enabling CORS
                .cors(Customizer.withDefaults())
                // Disabling CSRF (Safe to do because we are moving to stateless JWTs!)
                .csrf(csrf -> csrf.disable())
                // 🚨 CRITICAL ARCHITECTURAL SHIFT: Make the session STATELESS!
                // This tells Spring: "Do NOT create a JSESSIONID cookie. Rely entirely on the
                // JWT."
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth// 🚨 THE MAGIC FIX: Allow all preflight OPTIONS requests to pass
                                                   // without a token!
                        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()) // Require authentication for all
                                                       // requests
                // .oauth2Login(Customizer.withDefaults()); // Enable OAuth2 Login with default
                // settings
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2LoginSuccesHandler) // Tell Spring to use our custom handler upon a
                                                                  // successful login
                )
                // Register our JWT Filter to run BEFORE the standard authentication filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Whitelist the React frontend URL
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

