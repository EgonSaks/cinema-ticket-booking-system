package com.cinema.backend.dto;

public class LoginResponseDTO {

    private String message;
    private String userName;
    private Long userId;

    public LoginResponseDTO(String message, String userName, Long userId) {
        this.message = message;
        this.userName = userName;
        this.userId = userId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
