package com.example.IFdb.service;

import com.example.IFdb.model.dto.restaurant.RestaurantDto;
import com.example.IFdb.model.entity.Restaurant;
import org.springframework.data.domain.Page;

public interface RestaurantService {

    Restaurant createRestaurantPage(Integer userId,RestaurantDto restaurantDto);
//    Page<Restaurant> getAllRestaurants(String searchCriteria);
}
