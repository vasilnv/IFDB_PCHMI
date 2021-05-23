package com.example.IFdb.model.dto.restaurant;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class CreateRestaurantDto {

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String description;

    @Column
    private String[] foods;
}
