package com.Zero_Knowledge.AetherVault.Repository;
import com.Zero_Knowledge.AetherVault.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // We will use this in our success handler to check if the Google user is already in our DB
    Optional<User> findByEmail(String email);
}