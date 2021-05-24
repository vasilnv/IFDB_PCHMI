package com.example.IFdb.model.entity;

import com.example.IFdb.model.enums.RatingType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Blob;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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

    @Column
    @Enumerated(EnumType.STRING)
    private RatingType rating;

    @NotNull
    @Column
    private String[] foods;
//
//    @ManyToMany(cascade = { CascadeType.ALL })
//    @JoinTable(
//            name = "comments",
//            joinColumns = { @JoinColumn(name = "restaurantId") },
//            inverseJoinColumns = { @JoinColumn(name = "userId") }
//    )
//    Set<User> users = new HashSet<>();

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private List<Comment> commentsList;


}
