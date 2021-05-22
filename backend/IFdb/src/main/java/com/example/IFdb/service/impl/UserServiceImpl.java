package com.example.IFdb.service.impl;

import com.example.IFdb.model.dto.InputUserDto;
import com.example.IFdb.model.dto.UserDto;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.model.enums.UserType;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public User registerUser(InputUserDto userDto) {
        User newUser = new User();
        newUser.setUsername(userDto.getUsername());
        newUser.setPassword(userDto.getPassword());
        newUser.setEmail(userDto.getEmail());
        newUser.setBlocked(false);
        newUser.setUserType(UserType.REGISTERED_USER);
        return this.userRepository.save(newUser);
    }
}
