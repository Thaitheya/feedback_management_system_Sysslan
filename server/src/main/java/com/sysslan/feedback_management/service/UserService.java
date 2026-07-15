package com.sysslan.feedback_management.service;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.sysslan.feedback_management.model.User;
import com.sysslan.feedback_management.repository.UserRepository;

@Service
public class UserService {

    public final UserRepository repository;
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User addUser(@NonNull User user) {
        return repository.save(user);
    }
    
}
