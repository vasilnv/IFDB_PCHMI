package com.example.IFdb.service;

import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.entity.Restaurant;

public interface RestaurantService {

    Restaurant createRestaurantPage(Integer userId, CreateRestaurantDto createRestaurantDto);
//    Page<Restaurant> getAllRestaurants(String searchCriteria);
}
