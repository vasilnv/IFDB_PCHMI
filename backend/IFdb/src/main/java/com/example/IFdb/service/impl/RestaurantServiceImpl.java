package com.example.IFdb.service.impl;

import com.example.IFdb.exception.RestaurantNotFoundException;
import com.example.IFdb.exception.UserNotFoundException;
import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.restaurant.RestaurantDto;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.model.enums.UserType;
import com.example.IFdb.repository.RestaurantRepository;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RestaurantServiceImpl implements RestaurantService {
    private RestaurantRepository restaurantRepository;
    private UserRepository userRepository;

    @Autowired
    public RestaurantServiceImpl(UserRepository userRepository, RestaurantRepository restaurantRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Restaurant createRestaurantPage(Integer userId, CreateRestaurantDto createRestaurantDto) {
        User user = getUserById(userId);

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(createRestaurantDto.getAddress());
        restaurant.setName(createRestaurantDto.getName());
//        restaurant.setBuffer(restaurantDto.getBuffer());
        restaurant.setDescription(createRestaurantDto.getDescription());
        restaurant.setFoods(createRestaurantDto.getFoods());

        return this.restaurantRepository.save(restaurant);
    }

//    @Override
//    public Page<Restaurant> getAllRestaurants(String searchCriteria) {
//        Restaurant restaurant = new Restaurant();
//
//    }


    private User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageFormat.format("User with id:{0} not found", id)));
    }

//    private Restaurant getRestaurantByName(Restaurant newRestaurant,String restaurantName) {
//        newRestaurant.setName(restaurantName);
//        Example<Restaurant> restaurantExample1 = Example.of(newRestaurant);
//        return restaurantRepository.findOne(restaurantExample1).orElseThrow(() -> new RestaurantNotFoundException(MessageFormat.format("Restaurant with name:{0} not found", restaurantName)));
//    }
//    private User getRestaurantByFood(String foodName) {
////        List<String> newListFoodNames = new ArrayList<>();
////        if()
////        Example<Restaurant> restaurantExample1 = Example.of(newRestaurant);
////        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageFormat.format("Restaurant with food name:{0} not found", foodName)));
//    }


}
