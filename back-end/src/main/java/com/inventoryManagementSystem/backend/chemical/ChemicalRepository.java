package com.inventoryManagementSystem.backend.chemical;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChemicalRepository extends JpaRepository<Chemical,Long> {

    List<Chemical> findBychemicalName(String chemicalName);

    @Query("SELECT c FROM Chemical c WHERE c.chemId = :chemId")
    Chemical getChemicalById(@Param("chemId") Long chemId);
}
