package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iamneo.security.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    // Custom query methods (if needed)
	 @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Sale e WHERE e.type = 'sale'")
	    Double getSalesTotalAmount();

	    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.type = 'expense'")
	    Double getExpenseTotalAmount();
}
