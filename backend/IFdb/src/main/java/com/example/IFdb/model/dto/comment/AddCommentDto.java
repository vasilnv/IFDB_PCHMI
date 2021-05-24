package com.example.IFdb.model.dto.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Setter
@Getter
@NoArgsConstructor
public class AddCommentDto {
    @Column
    private Integer restaurant_id;

    @Column
    private Integer user_id;

    @Column
    private String comment;

}
