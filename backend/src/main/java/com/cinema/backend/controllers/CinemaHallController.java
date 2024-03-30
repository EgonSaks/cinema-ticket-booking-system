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

    @GetMapping("/api/v1/movie/{movieId}/{movieSession}")
    public ResponseEntity<?> getUpdatedSeats(@PathVariable Long movieId, @PathVariable String movieSession) {
        Optional<CinemaHall> cinemaHallOptional = cinemaHallRepository.findByMovieIdAndMovieSession(movieId, movieSession);
        if (cinemaHallOptional.isPresent()) {
            CinemaHall cinemaHall = cinemaHallOptional.get();
            System.out.println(cinemaHall);
            return ResponseEntity.ok().body(cinemaHall.getUpdatedSeats());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Cinema hall for movie ID " + movieId + " and session " + movieSession + " not found"));
        }
    }

    @PutMapping("/api/v1/movie/{movieId}/{movieSession}")
    public ResponseEntity<?> updateOccupiedSeats(@PathVariable Long movieId, @PathVariable String movieSession, @RequestBody CinemaHallUpdateDTO updateDTO) {
        try {
            Optional<CinemaHall> cinemaHallOptional = cinemaHallRepository.findByMovieIdAndMovieSession(movieId, movieSession);
            CinemaHall cinemaHall = cinemaHallOptional.orElseGet(CinemaHall::new);

            cinemaHall.setMovieId(movieId);
            cinemaHall.setMovieSession(movieSession);
            if (updateDTO.getOrderTime() != null)
                cinemaHall.setOrderTime(updateDTO.getOrderTime());
            if (updateDTO.getUpdatedSeats() != null)
                cinemaHall.setUpdatedSeats(updateDTO.getUpdatedSeats());

            cinemaHallRepository.save(cinemaHall);

            String message = cinemaHallOptional.isPresent() ? "Cinema hall updated successfully" : "New cinema hall entry created successfully";
            return ResponseEntity.ok().body(Map.of("message", message));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }


}
