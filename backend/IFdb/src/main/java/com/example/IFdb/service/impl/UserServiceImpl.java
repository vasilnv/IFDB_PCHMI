package com.example.IFdb.service.impl;

import com.example.IFdb.exception.RestaurantNotFoundException;
import com.example.IFdb.exception.UserAlreadyBlockedException;
import com.example.IFdb.exception.UserNotFoundException;
import com.example.IFdb.model.dto.comment.AddCommentDto;
import com.example.IFdb.model.dto.rating.RatingDto;
import com.example.IFdb.model.dto.user.BlockUserDto;
import com.example.IFdb.model.dto.user.ChangeCredentialsDto;
import com.example.IFdb.model.dto.user.DeleteUserDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.dto.user.UserDto;
import com.example.IFdb.model.entity.Comment;
import com.example.IFdb.model.entity.Rating;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.model.enums.UserType;
import com.example.IFdb.repository.CommentRepository;
import com.example.IFdb.repository.RatingRepository;
import com.example.IFdb.repository.RestaurantRepository;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private CommentRepository commentRepository;
    private RestaurantRepository restaurantRepository;
    private RatingRepository ratingRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, CommentRepository commentRepository,
                           RestaurantRepository restaurantRepository, RatingRepository ratingRepository) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.restaurantRepository = restaurantRepository;
        this.ratingRepository = ratingRepository;
    }


    @Override
    public User registerUser(RegisterUserDto userDto) {
        User newUser = new User();
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(userDto.getPassword());
        newUser.setEmail(userDto.getEmail());
        newUser.setBlocked(false);
        newUser.setUserType(UserType.REGISTERED_USER);
        return this.userRepository.save(newUser);
    }

    @Override
    public User loginUser(LoginUserDto user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        Example exampleUser = Example.of(newUser);
        Optional<User> optionalUser = this.userRepository.findOne(exampleUser);
        if (optionalUser.isEmpty()) {
            throw new UserNotFoundException("There is no such user!");
        }
        return optionalUser.get();
    }

    @Override
    public User changeCredentials(ChangeCredentialsDto changeCredentialsDto) {
        User user = getUserById(changeCredentialsDto.getId());
        if(!changeCredentialsDto.getPassword().isEmpty()){
            user.setPassword(changeCredentialsDto.getPassword());
        }
        if(!changeCredentialsDto.getEmail().isEmpty()){
            user.setEmail(changeCredentialsDto.getEmail());
        }
        return this.userRepository.save(user);
    }

    @Override
    public void blockUsers(BlockUserDto blockUserDto){
        for(Integer id : blockUserDto.getUserIds()){
            User user = getUserById(id);
            if(user.isBlocked()){
                throw new UserAlreadyBlockedException("This user with id: " + id + " is already blocked!");
            }
            user.setBlocked(true);
            this.userRepository.save(user);
        }
    }

    @Override
    public void deleteUser(DeleteUserDto deleteUserDto){
        User user = getUserById(deleteUserDto.getId());
        this.userRepository.delete(user);
    }

    @Override
    public void addComment(AddCommentDto addCommentDto) {
        User user = getUserById(addCommentDto.getUser_id());
        Restaurant restaurant = getRestaurantById(addCommentDto.getRestaurant_id());
        Comment comment = new Comment();
        comment.setRestaurant(restaurant);
        comment.setUser(user);
        comment.setComment(addCommentDto.getComment());
        commentRepository.save(comment);
    }

    @Override
    public Rating addRating(RatingDto ratingDto) {
        User user = getUserById(ratingDto.getUser_id());
        Restaurant restaurant = getRestaurantById(ratingDto.getRestaurant_id());
        Integer ratingId = ratingDto.getId();
        Rating rating = new Rating();
        if (ratingId != null) {
            rating = ratingRepository.getById(ratingDto.getId());
            ratingRepository.delete(rating);
        }

        rating.setUser(user);
        rating.setRestaurant(restaurant);
        rating.setRating(ratingDto.getRating());
        rating.setRatingType(ratingDto.getRatingType());
        ratingRepository.save(rating);
        return rating;
    }

    @Override
    public List<Rating> getUserRating(Integer userId, Integer restaurantId) {
        User user = userRepository.getById(userId);
        Restaurant restaurant = restaurantRepository.getById(restaurantId);

        List<Rating> userRatings = user.getRatingsList();
        List<Rating> restaurantRatings = restaurant.getRatingsList();

//        Integer avg = 0;
//        Integer cnt = 0;
//        for (Rating rating : restaurantRatings) {
//            avg += rating.getRating();
//            cnt++;
//        }
//        avg /= cnt;

        return userRatings;
    }


    @Override
    public void deleteComment(Integer commentId) {
        this.commentRepository.deleteById(commentId);

    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    private User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageFormat.format("User with id:{0} not found", id)));
    }

    private Restaurant getRestaurantById(Integer id) {
        return restaurantRepository.findById(id).orElseThrow(() -> new RestaurantNotFoundException(MessageFormat.format("Restaurant with id:{0} not found", id)));
    }



}
