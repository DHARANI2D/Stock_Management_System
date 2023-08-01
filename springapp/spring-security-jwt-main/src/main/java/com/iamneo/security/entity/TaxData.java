package com.iamneo.security.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TaxData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String month;
    private String year;
    private double taxableIncome;
    private double taxAmount;
    private double totalCredits;
    private double netTax;
    private boolean isPaid;
	private String mail;


    // Constructors, getters, setters, and other methods (omitted for brevity)
}