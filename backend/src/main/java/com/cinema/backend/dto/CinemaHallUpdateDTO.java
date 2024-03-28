package com.cinema.backend.dto;

import java.util.List;

public class CinemaHallUpdateDTO {
    private String movieSession;
    private List<Integer> updatedSeats;

    public String getMovieSession() {
        return movieSession;
    }

    public void setMovieSession(String movieSession) {
        this.movieSession = movieSession;
    }

    public List<Integer> getUpdatedSeats() {
        return updatedSeats;
    }

    public void setUpdatedSeats(List<Integer> updatedSeats) {
        this.updatedSeats = updatedSeats;
    }


}