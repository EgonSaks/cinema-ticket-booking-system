package com.cinema.backend.controllers;

import com.cinema.backend.models.Order;
import com.cinema.backend.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/api/v1/order")
    Order newOrder(@RequestBody Order newOrder) {
        return orderRepository.save(newOrder);
    }
}
