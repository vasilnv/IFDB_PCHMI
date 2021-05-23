import React from 'react';

import StarFill from 'assets/star-fill.svg';
import RestaurantImg from 'assets/restaurant.jpg';
import { restaurant } from './RestaurantPageConstants';

import './RestaurantPage.scss';
import { Button } from 'react-bootstrap';

const RestaurantPage = ({

}) => {

    return (
        <div className="restaurant-page-wrapper">
            <div className="restaurant-page-header">
                <div className="left-part">
                    <h1 className="header-title"> {restaurant.name} </h1>
                    {
                        Array.from(Array(restaurant.rate).keys()).map(x => {
                            return <img src={StarFill} alt="rate" />
                        })
                    }
                </div>
                <div className="right-part">
                    <img className="restaurant-img" src={RestaurantImg} alt="rate" />
                </div>
            </div>
            <div className="restaurant-page-content">
                <div className="content-address">
                    <div className="content-address-title">
                        Адрес:
                        </div>
                    <div className="content-address-content">
                        {restaurant.address}
                    </div>
                </div>
                <div className="content-description">
                    <div className="content-address-title">
                        Описание:
                        </div>
                    <div className="content-address-content">
                        {restaurant.description}
                    </div>
                </div>
                <div className="content-rate">
                    <div className="content-rate-col title">
                        <div className="content-rate-title">
                            Атмосфера:
                        </div>
                        <div className="content-rate-title">
                            Обслужване:
                        </div>
                        <div className="content-rate-title">
                            Качество на храната:
                        </div>
                    </div>
                    <div className="content-rate-col content">
                        <div className="content-rate-content">
                            {
                                Array.from(Array(restaurant.atmosphere).keys()).map(x => {
                                    return <img src={StarFill} alt="rate" />
                                })
                            }
                        </div>
                        <div className="content-rate-content">
                            {
                                Array.from(Array(restaurant.serve).keys()).map(x => {
                                    return <img src={StarFill} alt="rate" />
                                })
                            }
                        </div>
                        <div className="content-rate-content">
                            {
                                Array.from(Array(restaurant.quality).keys()).map(x => {
                                    return <img src={StarFill} alt="rate" />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="food-wrapper">
                    <div className="title">
                        Предлагани храни:
                    </div>
                    {
                        restaurant.foods.map(x => {
                            return (
                                <div className="food">
                                    {x}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="comment-section">
                    <div className="title">
                        Коментари
                    </div>
                    <div className="content">
                        {
                            restaurant.comments.map(x => {
                                return (
                                    <div className="comment-wrapper">
                                        <div className="comment">
                                            {x}
                                        </div>
                                        <Button >
                                            Блокиране
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RestaurantPage;
