package com.example.IFdb.exception;

public class RestaurantNotFoundException  extends  RuntimeException{
    public RestaurantNotFoundException(String message){
        super(message);
    }
}
