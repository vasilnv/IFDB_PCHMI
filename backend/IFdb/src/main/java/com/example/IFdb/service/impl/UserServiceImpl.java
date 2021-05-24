package com.example.IFdb.service.impl;

import com.example.IFdb.exception.UserAlreadyBlockedException;
import com.example.IFdb.exception.UserNotFoundException;
import com.example.IFdb.model.dto.comment.AddCommentDto;
import com.example.IFdb.model.dto.user.BlockUserDto;
import com.example.IFdb.model.dto.user.ChangeCredentialsDto;
import com.example.IFdb.model.dto.user.DeleteUserDto;
import com.example.IFdb.model.dto.user.LoginUserDto;
import com.example.IFdb.model.dto.user.RegisterUserDto;
import com.example.IFdb.model.dto.user.UserDto;
import com.example.IFdb.model.entity.Comment;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.model.enums.UserType;
import com.example.IFdb.repository.CommentRepository;
import com.example.IFdb.repository.UserRepository;
import com.example.IFdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private CommentRepository commentRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
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

    @Override
    public User changeCredentials(ChangeCredentialsDto changeCredentialsDto) {
        User user = getUserById(changeCredentialsDto.getId());
        if(!changeCredentialsDto.getPassword().isEmpty()){
            user.setPassword(changeCredentialsDto.getPassword());
        }
        if(!changeCredentialsDto.getEmail().isEmpty()){
            user.setEmail(changeCredentialsDto.getEmail());
        }
        return this.userRepository.save(user);
    }

    @Override
    public void blockUsers(BlockUserDto blockUserDto){
        for(Integer id : blockUserDto.getUserIds()){
            User user = getUserById(id);
            if(user.isBlocked()){
                throw new UserAlreadyBlockedException("This user with id: " + id + " is already blocked!");
            }
            user.setBlocked(true);
            this.userRepository.save(user);
        }
    }

    @Override
    public void deleteUser(DeleteUserDto deleteUserDto){
        User user = getUserById(deleteUserDto.getId());
        this.userRepository.delete(user);
    }

    @Override
    public void addComment(AddCommentDto addCommentDto) {
        User user = getUserById(addCommentDto.getUser_id());
        Comment comment = new Comment();
        comment.setComment(addCommentDto.getComment());
        List<Comment> newComments = new ArrayList<>();
        for (Comment c : user.getCommentList()) {
            newComments.add(c);
        }
        newComments.add(comment);
        user.setCommentList(newComments);
        userRepository.save(user);
//        commentRepository.save(comment);
    }

    private User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(MessageFormat.format("User with id:{0} not found", id)));
    }



}
