package com.example.IFdb.exception;

public class UserAlreadyBlockedException extends RuntimeException{
    public UserAlreadyBlockedException(String message){
        super(message);
    }
}
