package com.quickstay.service;


import com.quickstay.exception.UserException;
import com.quickstay.model.AuthenticatedUser;
import com.quickstay.model.User;
import com.quickstay.model.UserLogin;
import com.quickstay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserAppService {

    @Autowired
    private UserRepository userRepository;

    public static Map<String, AuthenticatedUser> authUsers = new HashMap<>();


    public User register(User user) throws UserException {
        if (userRepository.existsById(user.getUsername())) {
            throw new UserException(400, "USER ALREADY EXIST");
        } else {
            return userRepository.save(user);
        }
    }

    public User findUserByUsername(String username) throws UserException {
        Optional<User> userOptional = userRepository.findById(username);
        return userOptional.orElseThrow(() -> new UserException(404, "USER NOT FOUND"));
    }


    public AuthenticatedUser login(UserLogin userLogin) throws UserException {
        Calendar now = Calendar.getInstance();
        String username = userLogin.getUsername();
        Optional<User> userOptional = userRepository.findByUsernameAndPassword(username, userLogin.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String uuid = UUID.randomUUID().toString();
            AuthenticatedUser authenticatedUser = new AuthenticatedUser();
            authenticatedUser.setUsername(user.getUsername());
            authenticatedUser.setName(user.getName());
            authenticatedUser.setToken(uuid);
            authenticatedUser.setUserRole(user.getUserRole());
            now.add(Calendar.SECOND, 120);
            authenticatedUser.setExpiryTime(now);
            authUsers.put(uuid, authenticatedUser);
            return authenticatedUser;
        } else {
            throw new UserException(400, "INVALID USERNAME OR PASSWORD");
        }
    }

    public void logout(String uuid) {
        authUsers.remove(uuid);
    }
}
