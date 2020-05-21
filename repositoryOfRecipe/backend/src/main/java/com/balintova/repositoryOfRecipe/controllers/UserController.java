package com.balintova.repositoryOfRecipe.controllers;
import com.balintova.repositoryOfRecipe.models.Person;
import com.balintova.repositoryOfRecipe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/username={username}password={password}")
    public Person getUserInfo (@PathVariable String username, @PathVariable String password) {
        if(userService.findUser(username, password)){
            try {
                return userService.getUserInfo(username, password);
            } catch (Exception e) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, e.getMessage(), e);
            }
        } else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Wrong username or password");
        }
    }

    @PostMapping("/users")
    public ResponseEntity<Void> addUser(@RequestBody Person person) {
        try {
            userService.addUser(person);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

    }

}
