package com.balintova.repositoryOfRecipe.controllers;
import com.balintova.repositoryOfRecipe.models.Person;
import com.balintova.repositoryOfRecipe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/userName={username}password={password}")
    public Person getUserInfo (@PathVariable String username, @PathVariable String password) {
        return userService.getUserInfo(username, password);
    }

}
