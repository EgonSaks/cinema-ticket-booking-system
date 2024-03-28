package com.cinema.backend.controllers;

import com.cinema.backend.models.CinemaHall;
import com.cinema.backend.repositories.CinemaHallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class CinemaHallController {

    @Autowired
    private CinemaHallRepository cinemaHallRepository;

    @GetMapping("/api/v1/movie/{movieId}")
    public ResponseEntity<?> getUpdatedSeats(@PathVariable Long movieId) {
        Optional<CinemaHall> cinemaHallOptional = cinemaHallRepository.findByMovieId(movieId);
        if (cinemaHallOptional.isPresent()) {
            CinemaHall cinemaHall = cinemaHallOptional.get();
            System.out.println(cinemaHall);
            return ResponseEntity.ok().body(cinemaHall.getUpdatedSeats());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Cinema hall for movie ID " + movieId + " not found"));
        }
    }

    @PostMapping("/api/v1/updateOccupiedSeatsInTheHall")
    public ResponseEntity<?> newHallSeating(@RequestBody CinemaHall newCinemaHall) {
        cinemaHallRepository.save(newCinemaHall);
        return ResponseEntity.ok().body(Map.of("success", true));
    }
}
