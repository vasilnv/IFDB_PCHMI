package com.example.IFdb.controller;

import com.example.IFdb.model.dto.restaurant.CreateRestaurantDto;
import com.example.IFdb.model.dto.restaurant.RestaurantDto;
import com.example.IFdb.model.dto.user.UserDto;
import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.entity.User;
import com.example.IFdb.service.RestaurantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@Validated
@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
    private RestaurantService restaurantService;
    private ModelMapper modelMapper = new ModelMapper();

    @Autowired
    public RestaurantController(RestaurantService restaurantService){
        this.restaurantService = restaurantService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<RestaurantDto> createRestaurantPage(@PathVariable(value = "userId") Integer userId,
                                                              @RequestParam(value = "attachedfile") MultipartFile multipartFile,
                                                              @RequestBody @Valid CreateRestaurantDto createRestaurantDto){

//        Restaurant newRestaurant = this.restaurantService.createRestaurantPage(userId,createRestaurantDto);
        //this.modelMapper.map(newRestaurant,RestaurantDto.class)
        System.out.println("name");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    @GetMapping("/{searchCriteria}")
//    public ResponseEntity<List<RestaurantDto>> findRestaurants(@PathVariable(value = "searchCriteria") String searchCriteria){
//
//        Page<Restaurant> restaurants = this.restaurantService.getAllRestaurants(searchCriteria);
//        Page<RestaurantDto> dtoPage = restaurants.map(restaurant -> modelMapper.map(restaurant, RestaurantDto.class));
//        List<RestaurantDto> restaurantsDto = dtoPage.getContent();
//        return new ResponseEntity<>(restaurantsDto, HttpStatus.OK);
//    }
}
