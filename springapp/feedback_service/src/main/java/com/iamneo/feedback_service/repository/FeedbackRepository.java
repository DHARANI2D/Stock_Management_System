package com.iamneo.feedback_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.feedback_service.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>{

}
