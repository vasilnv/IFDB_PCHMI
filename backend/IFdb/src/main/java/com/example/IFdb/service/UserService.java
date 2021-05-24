package com.example.IFdb.service;

import com.example.IFdb.model.dto.comment.AddCommentDto;
import com.example.IFdb.model.dto.user.BlockUserDto;
import com.example.IFdb.model.dto.user.ChangeCredentialsDto;
import com.example.IFdb.model.dto.user.DeleteUserDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.entity.Comment;
import com.example.IFdb.model.entity.User;

public interface UserService {
    User registerUser(RegisterUserDto user);

    User loginUser(LoginUserDto user);

    User changeCredentials(ChangeCredentialsDto changeCredentialsDto);

    void blockUsers(BlockUserDto blockUserDto);

    void deleteUser(DeleteUserDto deleteUserDto);

    void addComment(AddCommentDto addCommentDto);

    void deleteComment(Integer commentId);

}
