package com.sysslan.feedback_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sysslan.feedback_management.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUserName(String userName);
    boolean existsByUserName(String userName);
    
}
