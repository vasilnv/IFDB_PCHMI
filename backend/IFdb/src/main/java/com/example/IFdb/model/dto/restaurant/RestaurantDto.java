package com.example.IFdb.model.dto.restaurant;

import com.example.IFdb.model.enums.RatingType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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
public class RestaurantDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column
    private byte[] buffer;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private String address;

    @NotNull
    @Column
    private String description;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private RatingType rating;

    @NotNull
    @Column
    private String[] comments;

    @NotNull
    @Column
    private String[] foods;
}
