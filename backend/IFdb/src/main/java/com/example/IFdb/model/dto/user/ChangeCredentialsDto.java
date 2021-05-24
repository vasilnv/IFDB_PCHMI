package com.example.IFdb.model.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@NoArgsConstructor
public class ChangeCredentialsDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column
    private String password;

    @NotNull
    @Column
    private String passwordNew;

    @NotNull
    @Column
    private String email;

}
