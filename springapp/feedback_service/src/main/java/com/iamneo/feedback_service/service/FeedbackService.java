package com.iamneo.feedback_service.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.iamneo.feedback_service.dto.FeedbackRequest;
import com.iamneo.feedback_service.dto.FeedbackResponse;
import com.iamneo.feedback_service.entity.Feedback;
import com.iamneo.feedback_service.repository.FeedbackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackService {
	private final FeedbackRepository feedbackRepository;

	public boolean addFeedback(FeedbackRequest feedbackRequest) {
		var feedback = Feedback.builder().email(feedbackRequest.getEmail()).feedback(feedbackRequest.getFeedback()).build();
		feedbackRepository.save(feedback);
		List<Feedback> feedbackData = feedbackRepository.findAll();
		if(feedbackData.size() > 0) {
			return true;
		} else {
			return false;
		}
	}

	public List<FeedbackResponse> getFeedback() {
		List<Feedback> feedbacks = feedbackRepository.findAll();
		return feedbacks.stream().map(feedback -> mapToFeedbackResponse(feedback)).toList();
	}

	private FeedbackResponse mapToFeedbackResponse(Feedback feedback) {
		return FeedbackResponse.builder().email(feedback.getEmail()).feedback(feedback.getFeedback()).build();
	}

}
