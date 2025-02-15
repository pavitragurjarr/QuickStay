package com.quickstay.api;

import com.quickstay.exception.UserException;
import com.quickstay.model.AuthenticatedUser;
import com.quickstay.model.User;
import com.quickstay.model.UserLogin;
import com.quickstay.service.UserAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/")
public class LoginController {

    @Autowired
    UserAppService userAppService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws Exception {
        return userAppService.register(user);
    }

    @PostMapping("/login")
    public AuthenticatedUser login(@RequestBody UserLogin userLogin) throws UserException {
        return userAppService.login(userLogin);
    }

    @PostMapping("/logout")
    public String logout() {
        return "LOGGED OUT";
    }

    @GetMapping("/profile/{username}")
    public User getProfileByUsername(@PathVariable(value = "username") String username) throws UserException {
        return userAppService.findUserByUsername(username);
    }
}
