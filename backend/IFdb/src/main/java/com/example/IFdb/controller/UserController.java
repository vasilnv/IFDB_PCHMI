package com.example.IFdb.controller;


import com.example.IFdb.model.dto.InputUserDto;
import com.example.IFdb.model.dto.UserDto;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {
    private UserService userService;
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody InputUserDto inputUserDto){
        User newUser = this.userService.registerUser(inputUserDto);
        return new ResponseEntity<>(this.modelMapper.map(newUser,UserDto.class), HttpStatus.CREATED);
    }


}
