package com.example.IFdb.controller;


import com.example.IFdb.model.dto.comment.AddCommentDto;
import com.example.IFdb.model.dto.comment.CommentDto;
import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.restaurant.RestaurantDto;
import com.example.IFdb.model.dto.user.BlockUserDto;
import com.example.IFdb.model.dto.user.ChangeCredentialsDto;
import com.example.IFdb.model.dto.user.DeleteUserDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.dto.user.UserDto;
import com.example.IFdb.model.dto.user.UserOnlyRestaurantDto;
import com.example.IFdb.model.entity.Comment;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.service.RestaurantService;
import com.example.IFdb.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
@Validated
public class UserController {
    private UserService userService;
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public UserController(UserService userService, RestaurantService restaurantService){
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

    @PutMapping("/change-credentials")
    public ResponseEntity<UserDto> changeUserCredentials(@Valid @RequestBody ChangeCredentialsDto changeCredentialsDto){
        User newUser = this.userService.changeCredentials(changeCredentialsDto);
        return new ResponseEntity<>(this.modelMapper.map(newUser,UserDto.class), HttpStatus.OK);
    }

    @PatchMapping("/block")
    public ResponseEntity blockUsers(@Valid @RequestBody BlockUserDto blockUserDto){
        this.userService.blockUsers(blockUserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@Valid @RequestBody DeleteUserDto deleteUserDto){
        this.userService.deleteUser(deleteUserDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/add-comment")
    public ResponseEntity<AddCommentDto> addComment(@Valid @RequestBody AddCommentDto addCommentDto){
        this.userService.addComment(addCommentDto);
        return new ResponseEntity<>(addCommentDto,HttpStatus.OK);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Integer> deleteRestaurantComment(@PathVariable(value="id") Integer id){
        this.userService.deleteComment(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
