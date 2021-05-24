package com.example.IFdb.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;


@Entity(name = "restaurants")
@Setter
@Getter
@NoArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Lob
    @Column
    private Byte[] buffer;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private String address;

    @NotNull
    @Column
    private String description;

    @OneToMany
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private List<Rating> ratingList;

    @NotNull
    @Column
    private String[] foods;

    @OneToMany(mappedBy = "restaurant")
    private List<Comment> commentsList;


}
