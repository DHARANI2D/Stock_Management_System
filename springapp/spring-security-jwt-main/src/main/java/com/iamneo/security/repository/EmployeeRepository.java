package com.iamneo.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.iamneo.security.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    @Query("SELECT e FROM Employee e WHERE e.mail = :email")
//    List<Employee> findEmployeesByEmail(String email);
    
    public List<Employee> findByMail(String email);
}
