package com.cinema.backend.repositories;

import com.cinema.backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findFirstByCustomerIdOrderByCreatedAtDesc(Long customerId);
}