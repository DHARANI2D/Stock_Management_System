package com.iamneo.security.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.Sale;
import com.iamneo.security.repository.SaleRepository;

@Service
public class SaleService {
    private final SaleRepository saleRepository;

    @Autowired
    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale addSale(Sale sale) {
        return saleRepository.save(sale);
    }
}
