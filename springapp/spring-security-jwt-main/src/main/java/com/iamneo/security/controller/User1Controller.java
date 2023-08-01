package com.iamneo.security.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.dto.request.MessageRequest;
import com.iamneo.security.dto.request.User1Request;
import com.iamneo.security.service.User1Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class User1Controller {
	private final User1Service userService;
	
	@PostMapping("/addUserFeedback")
	public ResponseEntity<String> addUserFeedback(@RequestBody User1Request userRequest){
		userService.addUser1Feedback(userRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Feedback added!");
	}
	@PostMapping("/publishString")
	public ResponseEntity<String> sendMessage(@RequestBody MessageRequest messageRequest){
		userService.sendMessage(messageRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Message sent to rabbitmq successfully!");
	}
	
	@PostMapping("/publishJson")
	public ResponseEntity<String> sendJsonMessage(@RequestBody MessageRequest messageRequest){
		userService.sendMessage(messageRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Message sent to rabbitmq successfully!");
	}
}
