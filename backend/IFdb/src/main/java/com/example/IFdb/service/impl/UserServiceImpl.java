package com.example.IFdb.service.impl;

import com.example.IFdb.exception.UserNotFoundException;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.model.enums.UserType;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
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
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException("There is no such user!");
        }
        return optionalUser.get();
    }
}
