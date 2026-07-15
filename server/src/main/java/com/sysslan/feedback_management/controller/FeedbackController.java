package com.sysslan.feedback_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sysslan.feedback_management.DTO.FeedbackRequest;
import com.sysslan.feedback_management.model.Feedback;
import com.sysslan.feedback_management.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    public final FeedbackService feedbackService;

    public FeedbackController(FeedbackService service) {
        this.feedbackService = service;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedback(
            Authentication authentication) {

        return ResponseEntity.ok(
                feedbackService.getAllFeedback(authentication.getName()));
    }

    @GetMapping("/myfeedback")
    public ResponseEntity<List<Feedback>> getMyFeedback(
            Authentication authentication) {

        return ResponseEntity.ok(
                feedbackService.getMyFeedback(authentication.getName()));
    }

    @PostMapping("/add-feedback")
    public ResponseEntity<Feedback> addFeedback(
            @RequestBody FeedbackRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                feedbackService.addFeedback(authentication.getName(), request));
    }

}
