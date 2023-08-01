package com.iamneo.security.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.security.entity.TaxData;
import com.iamneo.security.service.TaxDataService;
@CrossOrigin(origins="*")

@RestController
@RequestMapping("/api/tax")
public class TaxDataController {

    private final TaxDataService taxDataService;

    @Autowired
    public TaxDataController(TaxDataService taxDataService) {
        this.taxDataService = taxDataService;
    }

    @GetMapping
    public ResponseEntity<List<TaxData>> getAllTaxData() {
        List<TaxData> allTaxData = taxDataService.getAllTaxData();
        return ResponseEntity.ok(allTaxData);
    }

    @PostMapping
    public ResponseEntity<TaxData> saveTaxData(@RequestBody TaxData taxData) {
        TaxData savedTaxData = taxDataService.saveTaxData(taxData);
        return ResponseEntity.ok(savedTaxData);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaidStatus(@PathVariable Long id, @RequestParam boolean isPaid) {
        taxDataService.updatePaidStatus(id, isPaid);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/sumnettax")
    public ResponseEntity<Double> getSumOfNetTax() {
            Double nettaxsum = taxDataService.getnetsumtax();
            return ResponseEntity.ok(nettaxsum);
    }

    @GetMapping("/totalsumnettaxpaid")
    public ResponseEntity<Double> getTotalSumOfNetTaxPaid(@RequestParam boolean isPaid) {
    	 Double nettaxsumpaid = taxDataService.getnetsumtaxpaid();
         return ResponseEntity.ok(nettaxsumpaid);
    }
}
 