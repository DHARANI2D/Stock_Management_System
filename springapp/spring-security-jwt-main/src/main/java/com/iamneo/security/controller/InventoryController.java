package com.iamneo.security.controller;

   
   import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.Inventory;
import com.iamneo.security.service.InventoryService;
   
   @RestController
   @RequestMapping("/api/inventory")
   public class InventoryController {
       private final InventoryService inventoryService;
   
       @Autowired
       public InventoryController(InventoryService inventoryService) {
           this.inventoryService = inventoryService;
       }
   
       @GetMapping("/all")
       public List<Inventory> getAllInventory() {
           return inventoryService.getAllInventory();
       }
   
       @GetMapping("/{id}")
       public Inventory getInventoryById(@PathVariable Long id) {
           return inventoryService.getInventoryById(id);
       }
   
       @PostMapping("/purchase")
       public Inventory createInventory(@RequestBody Inventory inventory) {
           return inventoryService.createInventory(inventory);
       }
   
       @PutMapping("/update/{id}")
       public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
           return inventoryService.updateInventory(id, updatedInventory);
       }
   
       @DeleteMapping("/delete/{id}")
       public void deleteInventory(@PathVariable Long id) {
           inventoryService.deleteInventory(id);
       }
   }
   