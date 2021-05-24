package com.example.IFdb.controller;


import com.example.IFdb.model.dto.comment.AddCommentDto;
import com.example.IFdb.model.dto.comment.CommentDto;
import com.example.IFdb.model.dto.rating.RatingDto;
import com.example.IFdb.model.dto.rating.UserRatingsDto;
import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.restaurant.RestaurantDto;
import com.example.IFdb.model.dto.user.*;
import com.example.IFdb.model.entity.Comment;
import com.example.IFdb.model.entity.Rating;
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

    @GetMapping("/all")
    public ResponseEntity<List<UserGetAllDto>> getAllUsers(){
        List<User> users = this.userService.getAllUsers();
        List<UserGetAllDto> usersDto = Arrays.asList(modelMapper.map(users, UserGetAllDto[].class));
        return new ResponseEntity<>(usersDto, HttpStatus.OK);
    }

    @PutMapping("/change-credentials")
    public ResponseEntity<UserDto> changeUserCredentials(@Valid @RequestBody ChangeCredentialsDto changeCredentialsDto){
        User newUser = this.userService.changeCredentials(changeCredentialsDto);
        return new ResponseEntity<>(this.modelMapper.map(newUser,UserDto.class), HttpStatus.OK);
    }

    @PutMapping("/block")
    public ResponseEntity<BlockUserDto> blockUsers(@Valid @RequestBody BlockUserDto blockUserDto){
        this.userService.blockUsers(blockUserDto);
        return new ResponseEntity<>(blockUserDto, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Integer> deleteUser (@PathVariable(value="id") Integer id){
        this.userService.deleteUser(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
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

    @PostMapping("/rate")
    public ResponseEntity<RatingDto> rate(@Valid @RequestBody RatingDto ratingDto){
        Rating rating = this.userService.addRating(ratingDto);
        return new ResponseEntity<>(this.modelMapper.map(rating, RatingDto.class),HttpStatus.OK);
    }

    @GetMapping("/rate/{restaurantId}/{userId}")
    public ResponseEntity<List<UserRatingsDto>> getRatings(@PathVariable(value="restaurantId") Integer restaurantId,
                                          @PathVariable(value="userId") Integer userId){
        List<Rating> ratings = this.userService.getUserRating(userId, restaurantId);
        List<UserRatingsDto> ratingsDto = Arrays.asList(modelMapper.map(ratings, UserRatingsDto[].class));
        return new ResponseEntity<>(ratingsDto,HttpStatus.OK);
    }

}
