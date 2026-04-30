package com.Zero_Knowledge.AetherVault.Repository;

import com.Zero_Knowledge.AetherVault.Entity.Secret;
import com.Zero_Knowledge.AetherVault.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecretRepository extends JpaRepository<Secret, Long> {
    // This allows us to fetch only the secrets belonging to the logged-in user
    List<Secret> findByUser(User user);
}