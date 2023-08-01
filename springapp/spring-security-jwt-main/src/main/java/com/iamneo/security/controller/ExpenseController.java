package com.iamneo.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.Expense;
import com.iamneo.security.service.ExpenseService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @GetMapping("/sales-total")
    public ResponseEntity<Double> getSalesTotalAmount() {
        Double salesTotalAmount = expenseService.getSalesTotalAmount();
        return ResponseEntity.ok(salesTotalAmount);
    }

    @GetMapping("/expense-total")
    public ResponseEntity<Double> getExpenseTotalAmount() {
        Double expenseTotalAmount = expenseService.getExpenseTotalAmount();
        return ResponseEntity.ok(expenseTotalAmount);
    }
}
