package com.sysslan.feedback_management.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

import com.sysslan.feedback_management.DTO.FeedbackRequest;
import com.sysslan.feedback_management.enums.FeedbackRole;
import com.sysslan.feedback_management.model.Feedback;
import com.sysslan.feedback_management.model.User;
import com.sysslan.feedback_management.repository.FeedbackRepository;
import com.sysslan.feedback_management.repository.UserRepository;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    public FeedbackService(FeedbackRepository feedbackRepository,
            UserRepository userRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    public List<Feedback> getAllFeedback(String username) {

    User user = userRepository.findByUserName(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole() == FeedbackRole.ADMIN) {
        return feedbackRepository.findAll();
    }

    return feedbackRepository.findByUserUserName(user.getUsername());
}

    public Feedback addFeedback(String username, FeedbackRequest request) {

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Feedback feedback = new Feedback();

        feedback.setFeedbackTitle(request.getFeedbackTitle());
        feedback.setDescription(request.getDescription());
        feedback.setCategory(request.getCategory());
        feedback.setRating(request.getRating());
        feedback.setCreatedAt(LocalDate.now());
        feedback.setFeedbackDate(LocalDate.now());
        feedback.setUpdatedAt(LocalDate.now());
        feedback.setUser(user);
        feedback.setRole(user.getRole());

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getMyFeedback(String userName) {

        return feedbackRepository.findByUserUserName(userName);

    }

}
