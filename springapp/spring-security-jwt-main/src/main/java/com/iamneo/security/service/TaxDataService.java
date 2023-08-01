package com.iamneo.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iamneo.security.entity.TaxData;
import com.iamneo.security.repository.TaxDataRepository;

@Service
public class TaxDataService {

    private final TaxDataRepository taxDataRepository;

    @Autowired
    public TaxDataService(TaxDataRepository taxDataRepository) {
        this.taxDataRepository = taxDataRepository;
    }

    public List<TaxData> getAllTaxData() {
        return taxDataRepository.findAll();
    }

    public TaxData saveTaxData(TaxData taxData) {
        return taxDataRepository.save(taxData);
    }

    public void updatePaidStatus(Long id, boolean isPaid) {
        TaxData taxData = taxDataRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid tax data ID: " + id));
        taxData.setPaid(isPaid);
        taxDataRepository.save(taxData);
    }

	public Double getnetsumtax() {
		return taxDataRepository.getnetsumtax();
	}

	public Double getnetsumtaxpaid() {
		return taxDataRepository.getnetsumtaxpaid();
	}
	
	
	
}
