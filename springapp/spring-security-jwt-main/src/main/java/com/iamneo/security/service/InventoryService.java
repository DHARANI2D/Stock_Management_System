package com.iamneo.security.service;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;
   import java.util.List;
   import com.iamneo.security.entity.Inventory;
   import com.iamneo.security.repository.InventoryRepository;
   
   @Service
   public class InventoryService {
       private final InventoryRepository inventoryRepository;
   
       @Autowired
       public InventoryService(InventoryRepository inventoryRepository) {
           this.inventoryRepository = inventoryRepository;
       }
   
       public List<Inventory> getAllInventory() {
           return inventoryRepository.findAll();
       }
   
       public Inventory getInventoryById(Long id) {
           return inventoryRepository.findById(id).orElse(null);
       }
   
       public Inventory createInventory(Inventory inventory) {
           return inventoryRepository.save(inventory);
       }
   
       public Inventory updateInventory(Long id, Inventory updatedInventory) {
           // Check if the inventory with the given id exists
           Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
           if (existingInventory == null) {
               return null;
           }
   
           // Update the existing inventory with the values from updatedInventory
           existingInventory.setDate(updatedInventory.getDate());
           existingInventory.setCategory(updatedInventory.getCategory());
           existingInventory.setProduct(updatedInventory.getProduct());
           existingInventory.setQuantity(updatedInventory.getQuantity());
           existingInventory.setPrice(updatedInventory.getPrice());
   
           return inventoryRepository.save(existingInventory);
       }
   
       public void deleteInventory(Long id) {
           inventoryRepository.deleteById(id);
       }
   }
   