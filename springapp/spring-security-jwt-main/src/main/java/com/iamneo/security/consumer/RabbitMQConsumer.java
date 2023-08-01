package com.iamneo.security.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.iamneo.security.dto.request.MessageRequest;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RabbitMQConsumer {
	
	@RabbitListener(queues = {"${rabbitmq.queue.name}"})
	public void consume(String message) {
		log.info(String.format("Received message from queue --> %s", message));
	}
	
	@RabbitListener(queues = {"${rabbitmq.json_queue.name}"})
	public void consumeJson(MessageRequest messageRequest) {
		log.info(String.format("Received message from queue --> %s", messageRequest.toString()));
	}
}
