package com.example.IFdb.model.enums;

public enum RatingType {
    ATMOSPHERE(0), SERVICE(0), FOOD_QUALITY(0);

    private Integer rating;

    RatingType(Integer rating){
        this.rating = rating;
    }

    public void setRating(Integer rating) {
        this.rating = (rating + this.rating) / 2;
    }

    public Integer getRating() {
        return rating;
    }
}
