package com.example.IFdb.service.impl;

import com.example.IFdb.exception.UserNotFoundException;
import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.user.UserDto;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.repository.RestaurantRepository;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.List;

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
    public Restaurant createRestaurantPage(Integer userId, MultipartFile multipartFile, CreateRestaurantDto createRestaurantDto) throws IOException, SQLException {
        User user = getUserById(userId);

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(createRestaurantDto.getAddress());
        restaurant.setName(createRestaurantDto.getName());
        Byte[] bytes = toObjects(multipartFile.getBytes());
        restaurant.setBuffer(bytes);
        restaurant.setDescription(createRestaurantDto.getDescription());
        restaurant.setFoods(createRestaurantDto.getFoods());
        user.getRestaurantList().add(restaurant);
        user.setRestaurantList(user.getRestaurantList());

        return this.restaurantRepository.save(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return this.restaurantRepository.findAll();
    }

    private Byte[] toObjects(byte[] bytesPrim) {

        Byte[] bytes = new Byte[bytesPrim.length];
        int i = 0;
        for (byte b : bytesPrim) bytes[i++] = b;
        return bytes;
    }

    private User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageFormat.format("User with id:{0} not found", id)));
    }

}
