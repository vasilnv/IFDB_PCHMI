package com.example.IFdb.model.dto.user;

import com.example.IFdb.model.entity.Restaurant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class UserOnlyRestaurantDto {

    private List<Restaurant> restaurantList;

}
