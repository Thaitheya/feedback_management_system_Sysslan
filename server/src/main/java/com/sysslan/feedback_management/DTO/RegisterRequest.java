package com.sysslan.feedback_management.DTO;
import com.sysslan.feedback_management.enums.FeedbackRole;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterRequest {
    @Column(name = "user_name")
    private String userName;
    private String password;
    @Column(name = "email")
    private String email;
    private FeedbackRole role;
}

