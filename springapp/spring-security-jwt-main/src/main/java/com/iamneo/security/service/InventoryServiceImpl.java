package com.iamneo.security.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Inventory;
import com.iamneo.security.repository.InventoryRepository;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @Override
    public List<Inventory> getCurrentStockLevelByProduct(String product) {
        List<Inventory> purchaseTransactions = inventoryRepository.findByProductAndTransactionType(product, "Purchase");
        List<Inventory> salesTransactions = inventoryRepository.findByProductAndTransactionType(product, "Sales");

        Map<String, Integer> productQuantitiesMap = new HashMap<>();

        for (Inventory purchase : purchaseTransactions) {
            productQuantitiesMap.put(purchase.getProduct(),
                    productQuantitiesMap.getOrDefault(purchase.getProduct(), 0) + purchase.getQuantity());
        }

        for (Inventory sales : salesTransactions) {
            productQuantitiesMap.put(sales.getProduct(),
                    productQuantitiesMap.getOrDefault(sales.getProduct(), 0) - sales.getQuantity());
        }

        List<Inventory> currentStockLevels = new ArrayList<>();
        for (String productName : productQuantitiesMap.keySet()) {
            int quantity = productQuantitiesMap.get(productName);
            currentStockLevels.add(new Inventory(null, productName, quantity, "Current Stock"));
        }

        return currentStockLevels;
    }

    @Override
    public List<Inventory> getPurchaseTransactions() {
        return inventoryRepository.findByTransactionType("Purchase");
    }

    @Override
    public List<Inventory> getSalesTransactions() {
        return inventoryRepository.findByTransactionType("Sales");
    }

    @Override
    public void addPurchaseTransaction(Inventory inventory) {
        inventory.setTransactionType("Purchase");
        inventoryRepository.save(inventory);
    }

    @Override
    public void addSalesTransaction(Inventory inventory) {
        inventory.setTransactionType("Sales");
        inventoryRepository.save(inventory);
    }
}
