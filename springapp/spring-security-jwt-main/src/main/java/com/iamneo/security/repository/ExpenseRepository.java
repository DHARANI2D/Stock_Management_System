package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.security.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
 
}
