package com.iamneo.security.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iamneo.security.dto.request.FeedbackRequest;
import com.iamneo.security.dto.request.MessageRequest;
import com.iamneo.security.dto.request.User1Request;
import com.iamneo.security.entity.User1;
import com.iamneo.security.publisher.RabbitMQProducer;
import com.iamneo.security.repository.User1Repository;

import lombok.RequiredArgsConstructor;
import vo.Feedback;

@Service
@RequiredArgsConstructor
public class User1Service {
	private final User1Repository userRepository;
	
	private final RestTemplate restTemplate;
	private final RabbitMQProducer producer;


	public void addUser1Feedback(User1Request userRequest) {
		var user = User1.builder().name(userRequest.getName()).email(userRequest.getEmail()).build();
		var feedback = FeedbackRequest.builder().email(userRequest.getEmail()).feedback(userRequest.getFeedback()).build();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<FeedbackRequest> requestEntity = new HttpEntity<>(feedback, headers);
		restTemplate.postForObject("http://FEEDBACK-SERVICE/api/v1/feed/addFeedback", requestEntity, Feedback.class);
	}
	public void sendMessage(MessageRequest messageRequest) {
		producer.sendMessage(messageRequest.getMessage());
	}

	public void sendJsonMessage(MessageRequest messageRequest) {
		producer.sendJsonMessage(messageRequest);
	}
}
