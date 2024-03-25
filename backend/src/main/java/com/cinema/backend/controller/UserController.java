package com.cinema.backend.controller;

import com.cinema.backend.models.User;
import com.cinema.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/v1/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

}
