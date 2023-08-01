package com.iamneo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.TaxData;

@Repository
public interface TaxDataRepository extends JpaRepository<TaxData, Long> {

    // Custom query methods (if needed)
    List<TaxData> findByIsPaid(boolean isPaid);

    @Query("SELECT SUM(t.netTax) FROM TaxData t")
	Double getnetsumtax();
    
    @Query("SELECT SUM(t.netTax) FROM TaxData t WHERE t.isPaid = true")
	Double getnetsumtaxpaid();

    // You can add more custom query methods here based on your requirements

}
