package com.sysslan.feedback_management.DTO;

import com.sysslan.feedback_management.enums.FeedbackCategory;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackRequest {

    private String feedbackTitle;
    private String description;
    private FeedbackCategory category;
    private int rating;

}
