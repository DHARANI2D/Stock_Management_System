package com.iamneo.security.controller;

import com.iamneo.security.entity.Inventory;
import com.iamneo.security.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getAllInventory() {
        List<Inventory> inventoryList = inventoryService.getAllInventory();
        return new ResponseEntity<>(inventoryList, HttpStatus.OK);
    }

    @GetMapping("/stocks")
    public ResponseEntity<List<Inventory>> getCurrentStockLevels(@RequestParam String product) {
        List<Inventory> currentStockLevels = inventoryService.getCurrentStockLevelByProduct(product);
        return new ResponseEntity<>(currentStockLevels, HttpStatus.OK);
    }

    @GetMapping("/purchase")
    public ResponseEntity<List<Inventory>> getPurchaseTransactions() {
        List<Inventory> purchaseTransactions = inventoryService.getPurchaseTransactions();
        return new ResponseEntity<>(purchaseTransactions, HttpStatus.OK);
    }

    @GetMapping("/sales")
    public ResponseEntity<List<Inventory>> getSalesTransactions() {
        List<Inventory> salesTransactions = inventoryService.getSalesTransactions();
        return new ResponseEntity<>(salesTransactions, HttpStatus.OK);
    }

    @PostMapping("/purchase")
    public ResponseEntity<Void> addPurchaseTransaction(@RequestBody Inventory inventory) {
        inventoryService.addPurchaseTransaction(inventory);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/sales")
    public ResponseEntity<Void> addSalesTransaction(@RequestBody Inventory inventory) {
        inventoryService.addSalesTransaction(inventory);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
