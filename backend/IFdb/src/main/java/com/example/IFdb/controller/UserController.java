package com.example.IFdb.controller;


import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.restaurant.RestaurantDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.dto.user.UserDto;
import com.example.IFdb.model.dto.user.UserOnlyRestaurantDto;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto){
        User newUser = this.userService.registerUser(registerUserDto);
        return new ResponseEntity<>(this.modelMapper.map(newUser,UserDto.class), HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestParam(value = "username") String username,
                                             @RequestParam(value = "password") String password){
        LoginUserDto loginUserDto = new LoginUserDto(username,password);
        User newUser = this.userService.loginUser(loginUserDto);
        return new ResponseEntity<>(this.modelMapper.map(newUser,UserDto.class), HttpStatus.OK);
    }

//    @PostMapping("/{userId}")
//    public ResponseEntity<UserOnlyRestaurantDto> createRestaurantPage(@PathVariable(value = "userId") Integer userId,
//                                                              @RequestParam(value = "attachedfile") MultipartFile multipartFile,
//                                                              @RequestParam(value = "name") String name,
//                                                              @RequestParam(value = "address") String address,
//                                                              @RequestParam(value = "description") String description,
//                                                              @RequestParam(value = "foods") String[] foods) throws IOException, SQLException {
//
//        CreateRestaurantDto createRestaurantDto = new CreateRestaurantDto(name,address,description,foods);
//        User newUser = this.userService.createRestaurantPage(userId,multipartFile,createRestaurantDto);
//        return new ResponseEntity<>(this.modelMapper.map(newUser, UserOnlyRestaurantDto.class),HttpStatus.CREATED);
//    }



}
