package com.Zero_Knowledge.AetherVault.service;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // injecting value from application.yml
    @Value("${application.security.jwt.secret-key}")
    private String secretkey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    // generating token
    public String generateToken(String email) {
        return buildToken(new HashMap<>(), email, jwtExpiration);
    }

    private String buildToken(Map<String, Object> extraclaims, String email, long expiration) {
        return Jwts
                .builder()
                .setClaims(extraclaims)
                .setSubject(email)// The "subject" is usually the user identifier (email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)// Sign it cryptographically
                .compact();// Compress it into the final Base64 String
    }

    // Extracting email
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // validating token
    public boolean isTokenValid(String token, String userEmail) {
        final String email = extractEmail(token);
        return (email.equals(userEmail) && !isTokenExpired(token));
    }

    // Helper Method
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey()) // We need the key to "unlock" and read the claims
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}


