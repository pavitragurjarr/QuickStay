package com.quickstay.model;

import java.util.Calendar;

public class AuthenticatedUser {

    private String username;
    private String name;
    private UserRole userRole;
    private String token;
    private Calendar expiryTime;

    public AuthenticatedUser(String username, String name, String token, Calendar expiryTime) {
        this.username = username;
        this.name = name;
        this.token = token;
        this.expiryTime = expiryTime;
    }

    public AuthenticatedUser() {

    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Calendar getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Calendar expiryTime) {
        this.expiryTime = expiryTime;
    }
}
