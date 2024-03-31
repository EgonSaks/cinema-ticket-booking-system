package com.cinema.backend.dto;

import java.util.Objects;

public class LoginResponseDTO {
    private String message;
    private String userName;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String message, String userName) {
        this.message = message;
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginResponseDTO that = (LoginResponseDTO) o;
        return Objects.equals(message, that.message) && Objects.equals(userName, that.userName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(message, userName);
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
                "message='" + message + '\'' +
                ", userName='" + userName + '\'' +
                '}';
    }
}
