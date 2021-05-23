package com.example.IFdb.model.dto.user;

import com.example.IFdb.model.entity.Restaurant;
import com.example.IFdb.model.enums.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.List;


@Setter
@Getter
@NoArgsConstructor
public class UserDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column
    private String username;

    @NotNull
    @Column
    private String password;

    @NotNull
    @Column
    private String email;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column
    @NotNull
    private boolean isBlocked;

    private List<Restaurant> restaurantList;

}
