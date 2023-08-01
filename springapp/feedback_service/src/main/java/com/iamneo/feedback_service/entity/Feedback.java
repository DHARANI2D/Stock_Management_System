package com.iamneo.feedback_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Feedback {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long feedBackId;
	private String email;
	private String feedback;
}
