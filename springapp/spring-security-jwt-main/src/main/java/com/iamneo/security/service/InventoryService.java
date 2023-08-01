package com.iamneo.security.service;

import java.util.List;

import com.iamneo.security.entity.Inventory;

public interface InventoryService {

    List<Inventory> getAllInventory();

    List<Inventory> getCurrentStockLevelByProduct(String product);

    List<Inventory> getPurchaseTransactions();

    List<Inventory> getSalesTransactions();

    void addPurchaseTransaction(Inventory inventory);

    void addSalesTransaction(Inventory inventory);
}
