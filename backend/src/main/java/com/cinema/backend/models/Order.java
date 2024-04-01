package com.cinema.backend.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orderId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;
    private Long customerId;

    private String userName;
    private String orderDate;
    private Long movieId;
    private String movieTitle;
    private String movieGenres;
    private String movieLanguage;
    private double moviePrice;
    private int movieRuntime;
    @ElementCollection
    private List<Integer> seat;

    public Order() {
    }

    public Order(Long orderId, Long customerId, String userName, String orderDate, Long movieId, String movieTitle, String movieGenres, String movieLanguage, double moviePrice, int movieRuntime, List<Integer> seat) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.userName = userName;
        this.orderDate = orderDate;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.movieGenres = movieGenres;
        this.movieLanguage = movieLanguage;
        this.moviePrice = moviePrice;
        this.movieRuntime = movieRuntime;
        this.seat = seat;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getMovieGenres() {
        return movieGenres;
    }

    public void setMovieGenres(String movieGenres) {
        this.movieGenres = movieGenres;
    }

    public String getMovieLanguage() {
        return movieLanguage;
    }

    public void setMovieLanguage(String movieLanguage) {
        this.movieLanguage = movieLanguage;
    }

    public double getMoviePrice() {
        return moviePrice;
    }

    public void setMoviePrice(double moviePrice) {
        this.moviePrice = moviePrice;
    }

    public int getMovieRuntime() {
        return movieRuntime;
    }

    public void setMovieRuntime(int movieRuntime) {
        this.movieRuntime = movieRuntime;
    }

    public List<Integer> getSeat() {
        return seat;
    }

    public void setSeat(List<Integer> seat) {
        this.seat = seat;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Double.compare(moviePrice, order.moviePrice) == 0 && movieRuntime == order.movieRuntime && Objects.equals(orderId, order.orderId) && Objects.equals(customerId, order.customerId) && Objects.equals(userName, order.userName) && Objects.equals(orderDate, order.orderDate) && Objects.equals(movieId, order.movieId) && Objects.equals(movieTitle, order.movieTitle) && Objects.equals(movieGenres, order.movieGenres) && Objects.equals(movieLanguage, order.movieLanguage) && Objects.equals(seat, order.seat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, customerId, userName, orderDate, movieId, movieTitle, movieGenres, movieLanguage, moviePrice, movieRuntime, seat);
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", customerId=" + customerId +
                ", userName='" + userName + '\'' +
                ", orderDate='" + orderDate + '\'' +
                ", movieId=" + movieId +
                ", movieTitle='" + movieTitle + '\'' +
                ", movieGenres='" + movieGenres + '\'' +
                ", movieLanguage='" + movieLanguage + '\'' +
                ", moviePrice=" + moviePrice +
                ", movieRuntime=" + movieRuntime +
                ", seat=" + seat +
                '}';
    }
}
