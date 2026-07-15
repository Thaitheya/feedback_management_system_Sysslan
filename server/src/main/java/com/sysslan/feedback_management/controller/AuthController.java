package com.sysslan.feedback_management.controller;

import java.security.InvalidKeyException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sysslan.feedback_management.DTO.AuthenticationResponse;
import com.sysslan.feedback_management.DTO.LoginRequest;
import com.sysslan.feedback_management.DTO.RegisterRequest;
import com.sysslan.feedback_management.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) throws InvalidKeyException {

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginRequest request) throws InvalidKeyException {

        return ResponseEntity.ok(authService.login(request));
    }
}
