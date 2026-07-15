package com.sysslan.feedback_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sysslan.feedback_management.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
     List<Feedback> findByUserUserName(String userName);
}
