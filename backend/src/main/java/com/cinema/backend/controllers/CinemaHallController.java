package com.cinema.backend.controllers;

import com.cinema.backend.models.CinemaHall;
import com.cinema.backend.repositories.CinemaHallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CinemaHallController {

    @Autowired
    private CinemaHallRepository cinemaHallRepository;

    @PostMapping("/api/v1/updateOccupiedSeatsInTheHall")
    public ResponseEntity<?> newHallSeating(@RequestBody CinemaHall newCinemaHall) {
        cinemaHallRepository.save(newCinemaHall);
        return ResponseEntity.ok().body(Map.of("success", true));
    }
}
