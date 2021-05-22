package com.example.IFdb.exception;

public class UserNotFoundException  extends  RuntimeException{
    public UserNotFoundException(String message){
        super(message);
    }
}
