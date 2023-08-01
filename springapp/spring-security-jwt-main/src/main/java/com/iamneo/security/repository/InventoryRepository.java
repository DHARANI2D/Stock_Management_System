package com.iamneo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    @Query("SELECT i.product, SUM(i.quantity) FROM Inventory i WHERE i.transactionType = 'Purchase' GROUP BY i.product")
    List<Inventory> findAll();
    List<Inventory> findByTransactionType(String transactionType);

    List<Inventory> findByProductAndTransactionType(String product, String transactionType);
}
