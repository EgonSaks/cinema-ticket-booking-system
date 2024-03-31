package com.cinema.backend.controllers;

import com.cinema.backend.dto.LoginResponseDTO;
import com.cinema.backend.models.User;
import com.cinema.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/v1/register")
    User newUser(@RequestBody User newUser) {
        return userService.registerUser(newUser);
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody User loginRequest) {
        User user = userService.getUserByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponseDTO("Invalid credentials", null, null));
        }

        if (userService.isPasswordMatch(loginRequest.getPassword(), user.getPassword())) {
            LoginResponseDTO response = new LoginResponseDTO("Login successful", user.getName(), user.getId());
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponseDTO("Invalid credentials", null, null));
        }
    }
}