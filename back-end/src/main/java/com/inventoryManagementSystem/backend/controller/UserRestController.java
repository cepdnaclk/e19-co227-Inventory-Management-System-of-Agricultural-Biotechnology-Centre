package com.inventoryManagementSystem.backend.controller;

import com.inventoryManagementSystem.backend.entity.Admin;
import com.inventoryManagementSystem.backend.entity.Student;
import com.inventoryManagementSystem.backend.exception.UnauthorizedAccessException;
import com.inventoryManagementSystem.backend.model.SetNewUsernameEmailPswd;
import com.inventoryManagementSystem.backend.model.User;
import com.inventoryManagementSystem.backend.repository.StudentRepository;
import com.inventoryManagementSystem.backend.repository.UserRepository;
import com.inventoryManagementSystem.backend.service.AdminService;
import com.inventoryManagementSystem.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1/user")
public class UserRestController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    StudentService studentService;
    @Autowired
    AdminService adminService;
    @Autowired
    PasswordEncoder encoder;


    @PutMapping("/update/{id}")
    public String updateUser(@PathVariable("id") Long id, @RequestBody SetNewUsernameEmailPswd user) {
        System.out.println(user.getNewUsername());
        System.out.println(user.getNewPassword());
        System.out.println(user.getNewEmail());
        System.out.println(user.getPassword());
        User userDB = userRepository.findById(id).get();
        if(encoder.matches(user.getPassword(), userDB.getPassword())) {
            userDB.setUsername(user.getNewUsername());
            userDB.setPassword(encoder.encode(user.getNewPassword()));
            userDB.setEmail(user.getNewEmail());
            userRepository.save(userDB);
            return "user updated !";
        }
        throw new UnauthorizedAccessException("Unauthorized to access patient data");
    }

    @GetMapping("/getByUsername/{username}")
    public Optional<User> getByUsername(@PathVariable("username") String username){
        return userRepository.findByUsername(username);
    }

    @GetMapping("/getByUid/{uid}")
    public Student getStudentByUid(@PathVariable("uid") Long uid){
        return studentService.getStudentByUid(uid);
    }

    @GetMapping("/getAdminByUid/{uid}")
    public Admin getAdminByUid(@PathVariable("uid") Long uid){
        return adminService.getAdminByUid(uid);
    }


}
