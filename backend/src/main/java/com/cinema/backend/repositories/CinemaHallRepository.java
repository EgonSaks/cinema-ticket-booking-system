package com.cinema.backend.repositories;

import com.cinema.backend.models.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CinemaHallRepository extends JpaRepository<CinemaHall, Long> {

    Optional<CinemaHall> findByMovieIdAndMovieSession(Long movieId, String movieSession);
}
