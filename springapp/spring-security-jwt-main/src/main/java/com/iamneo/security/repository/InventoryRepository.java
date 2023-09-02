package com.iamneo.security.repository;
   
   import org.springframework.data.jpa.repository.JpaRepository;
   import com.iamneo.security.entity.Inventory;
   
   public interface InventoryRepository extends JpaRepository<Inventory, Long> {
       // You can add custom query methods if needed
   }