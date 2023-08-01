package com.iamneo.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.security.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
