package com.example.IFdb.service;

import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.entity.Restaurant;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface RestaurantService {

    Restaurant createRestaurantPage(Integer userId, MultipartFile multipartFile, CreateRestaurantDto createRestaurantDto) throws IOException, SQLException;

    List<Restaurant> getAllRestaurants();
}
