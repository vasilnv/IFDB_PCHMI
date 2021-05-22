package com.example.IFdb.service;


import com.example.IFdb.model.dto.InputUserDto;
import com.example.IFdb.model.entity.User;

public interface UserService {
    User registerUser(InputUserDto user);
}
