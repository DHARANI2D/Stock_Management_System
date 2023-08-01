package com.iamneo.security.publisher;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.iamneo.security.dto.request.MessageRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RabbitMQProducer {
	@Value("${rabbitmq.exchange.name}")
	private String exchange;
	
	@Value("${rabbitmq.routing-key}")
	private String routing_key;
	
	@Value("${rabbitmq.json-routing-key}")
	private String json_routing_key;
	
	private final RabbitTemplate rabbitTemplate;
	
	public void sendMessage(String message) {
		log.info(String.format("Message sent --> %s", message));
		rabbitTemplate.convertAndSend(exchange, routing_key, message);
	}
	
	public void sendJsonMessage(MessageRequest messageRequest) {
		log.info(String.format("Json message sent --> %s", messageRequest.toString()));
		rabbitTemplate.convertAndSend(exchange, json_routing_key, messageRequest);
	}
}
