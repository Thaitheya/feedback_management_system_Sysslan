package com.sysslan.feedback_management.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sysslan.feedback_management.DTO.AuthenticationResponse;
import com.sysslan.feedback_management.DTO.LoginRequest;
import com.sysslan.feedback_management.DTO.RegisterRequest;
import com.sysslan.feedback_management.enums.FeedbackRole;
import com.sysslan.feedback_management.exceptions.UserAlreadyExistsException;
import com.sysslan.feedback_management.model.User;
import com.sysslan.feedback_management.repository.UserRepository;
import com.sysslan.feedback_management.security.JwtService;

import java.security.InvalidKeyException;

import org.springframework.security.authentication.AuthenticationManager;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) throws InvalidKeyException {

        if (userRepository.existsByUserName(request.getUserName())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        User user = new User();
        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(FeedbackRole.USER);

        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(jwtToken, user.getUsername(), user.getRole().name());
    }

    public AuthenticationResponse login(LoginRequest request) throws InvalidKeyException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()));

        User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow();

        String jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(
                jwtToken,
                user.getUsername(),
                user.getRole().name());
    }
}
