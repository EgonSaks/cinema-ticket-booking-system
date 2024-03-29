package com.cinema.backend.controllers;

import com.cinema.backend.dto.CinemaHallUpdateDTO;
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
            return ResponseEntity.ok().body(cinemaHall.getUpdatedSeats());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Cinema hall for movie ID " + movieId + " not found"));
        }
    }

    @PutMapping("/api/v1/movie/{movieId}")
    public ResponseEntity<?> updateOccupiedSeats(@PathVariable Long movieId, @RequestBody CinemaHallUpdateDTO updateDTO) {
        try {
            CinemaHall cinemaHall = cinemaHallRepository.findByMovieId(movieId)
                    .orElse(new CinemaHall());

            cinemaHall.setMovieId(movieId);
            cinemaHall.setMovieSession(updateDTO.getMovieSession());
            cinemaHall.setUpdatedSeats(updateDTO.getUpdatedSeats());

            cinemaHallRepository.save(cinemaHall);

            return ResponseEntity.ok().body(Map.of("message", "Cinema hall updated successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

}
