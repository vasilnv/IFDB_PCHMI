package com.example.IFdb.service;


import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.entity.User;

public interface UserService {
    User registerUser(RegisterUserDto user);
    User loginUser(LoginUserDto user);
}
