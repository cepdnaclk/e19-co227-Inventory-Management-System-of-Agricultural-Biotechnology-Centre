package com.inventoryManagementSystem.backend.entity;

//import com.inventoryManagementSystem.backend.model.User;
import com.inventoryManagementSystem.backend.model.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String batch;
    private String department;
    private String mobileNo;
//    private String email;
//    @Column(length = 60)
//    private String password;
//    private String role;

    @OneToOne
    @JoinColumn(name = "uid")
    private User user;
}
