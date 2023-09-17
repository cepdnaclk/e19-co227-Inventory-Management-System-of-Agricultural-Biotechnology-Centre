package com.inventoryManagementSystem.backend.chemical;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Chemical {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chemId;

    private String chemicalName;
    private long quantity;
    private long unitPrice;
    private String brand;
    private String receivedDate;
    private String expirationDate;

}
