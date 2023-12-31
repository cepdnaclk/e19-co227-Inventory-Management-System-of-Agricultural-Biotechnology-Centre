package com.inventoryManagementSystem.backend.service;

import com.inventoryManagementSystem.backend.entity.Admin;
import com.inventoryManagementSystem.backend.repository.AdminRepository;
import com.inventoryManagementSystem.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private VerificationTokenRepository verificationTokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Admin registerAdmin(Admin admin) {
//        Admin admin = new Admin();
//        admin.setFirstName(adminModel.getFirstName());
//        admin.setLastName(adminModel.getLastName());

        return adminRepository.save(admin);
    }

    @Override
    public boolean existsAdminByUid(Long uid) {
        return adminRepository.existsByUserId(uid);
    }

    @Override
    public Admin getAdminByUid(Long uid) {
        return adminRepository.findByUser_Id(uid);
    }

}
