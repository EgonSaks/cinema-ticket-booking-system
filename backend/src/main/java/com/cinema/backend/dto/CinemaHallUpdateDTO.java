package com.cinema.backend.dto;

import java.util.List;

public class CinemaHallUpdateDTO {
    public String movieSession;
    private String orderTime;
    private List<Integer> updatedSeats;

    public String getMovieSession() {
        return movieSession;
    }

    public void setMovieSession(String movieSession) {
        this.movieSession = movieSession;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public List<Integer> getUpdatedSeats() {
        return updatedSeats;
    }

    public void setUpdatedSeats(List<Integer> updatedSeats) {
        this.updatedSeats = updatedSeats;
    }


}