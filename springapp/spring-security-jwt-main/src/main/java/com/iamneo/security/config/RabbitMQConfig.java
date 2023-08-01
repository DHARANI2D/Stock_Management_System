package com.iamneo.security.config;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
	
	@Value("${rabbitmq.queue.name}")
	private String queue;
	
	@Value("${rabbitmq.json_queue.name}")
	private String json_queue;
	
	@Value("${rabbitmq.exchange.name}")
	private String exchange;
	
	@Value("${rabbitmq.routing-key}")
	private String routing_key;
	
	@Value("${rabbitmq.json-routing-key}")
	private String json_routing_key;
	
	@Bean
	public Queue queue() {
		return new Queue(queue);
	}
	
	@Bean
	public TopicExchange exchange() {
		return new TopicExchange(exchange);
	}
	
	@Bean
	public Binding binding() {
		return BindingBuilder
				.bind(queue())
				.to(exchange())
				.with(routing_key);
	}
	
	@Bean
	public Queue jsonQueue() {
		return new Queue(json_queue);
	}
	
	
	@Bean
	public Binding jsonBinding() {
		return BindingBuilder
				.bind(jsonQueue())
				.to(exchange())
				.with(json_routing_key);
	}
	
	@Bean
	public MessageConverter messageConverter() {
		return new Jackson2JsonMessageConverter();
	}
	
	@Bean
	public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
		RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
		rabbitTemplate.setMessageConverter(messageConverter());
		return rabbitTemplate;
	}
	
//	ConnectionFactory
//	RabbitTemplate
//	RabbitAdmin
}
