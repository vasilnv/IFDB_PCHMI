package com.example.IFdb.service.impl;

import com.example.IFdb.exception.UserNotFoundException;
import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.model.enums.UserType;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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


//    @Override
//    public User createRestaurantPage(Integer userId, MultipartFile multipartFile, CreateRestaurantDto createRestaurantDto) throws IOException, SQLException {
//        User user = getUserById(userId);
//
//        Restaurant restaurant = new Restaurant();
//        restaurant.setAddress(createRestaurantDto.getAddress());
//        restaurant.setName(createRestaurantDto.getName());
//        Blob blob = new SerialBlob(multipartFile.getBytes());
//        restaurant.setBuffer(blob);
//        restaurant.setDescription(createRestaurantDto.getDescription());
//        restaurant.setFoods(createRestaurantDto.getFoods());
//        user.getRestaurantList().add(restaurant);
//        user.setRestaurantList(user.getRestaurantList());
//
//        return this.userRepository.save(user);
//    }

//    private User getUserById(Integer id) {
//        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageFormat.format("User with id:{0} not found", id)));
//    }
}
