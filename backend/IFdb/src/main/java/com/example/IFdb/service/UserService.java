package com.example.IFdb.service;

import com.example.IFdb.model.dto.user.ChangeCredentialsDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.entity.User;

import java.util.List;

public interface UserService {
    User registerUser(RegisterUserDto user);

    User loginUser(LoginUserDto user);

    User changeCredentials(ChangeCredentialsDto changeCredentialsDto);

    void blockUsers(List<String> userIds);
}
