import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import { ReactComponent as XIcon } from 'assets/x.svg';
import Rating from 'react-rating';
import StarFill from 'assets/star-fill.svg';
import Star from 'assets/star.svg';
import RestaurantImg from 'assets/restaurant.jpg';
import PlusCircleIcon from 'assets/plus-circle.svg';
import AddCommentDialog from './AddCommentDialog';
import userService from 'services/userService';
import { useAuth } from '../../contexts/AuthContext';

import { USER_TYPE } from 'constants/env';
import './RestaurantPage.scss';
import { Button } from 'react-bootstrap';

const RestaurantPage = ({

}) => {

    const { restaurantId } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [restaurant, setRestaurants] = useState({});
    const [comments, setComments] = useState([]);
    const [rates, setRates] = useState([]);
    const { currentUser } = useAuth();

    let history = useHistory();



    const newCookies = document.cookie.split(';');

    let result = {};
    newCookies.map((x) => {
        if (x) {
            const data = x.split('=');
            result[data[0].trim()] = data[1].trim();
        }
    }, {})

    useEffect(() => {
        userService.getRestaurant(restaurantId).then(x => setRestaurants(x));
        userService.getComments(restaurantId).then(x => setComments(x));
        userService.getRates(restaurantId, result._id).then(x => setRates(x))
    }, [])

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }

    const handleRemoveComment = async (index, commentId) => {
        await userService.removeComment(commentId);
        comments.splice(index, 1);
    };

    const handleSendComment = async (comment, setComment) => {
        const newComment = await userService.addComment({ comment, restaurant_id: restaurantId, user_id: result._id });

        setComments([...comments, newComment]);
        handleCloseDialog();
        setComment('');
    };

    const handleUpdateRate = async (rating, category) => {
        const data = {ratingType: category, rating, user_id: result._id, restaurant_id: restaurantId}
        await userService.updateRate(data);
    };

    return (
        <div className="restaurant-page-wrapper">
            <div className="restaurant-page-header">
                <div className="left-part">
                    <h1 className="header-title"> {restaurant.name} </h1>
                    {restaurant?.rate &&
                        Array.from(Array(restaurant.rate).keys()).map((x, index) => {
                            return <img key={index} src={StarFill} alt="rate" />
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
                            <Rating
                                initialRating={rates ? rates.filter(x => x.ratingType == 'ATMOSPHERE')[rates.filter(x => x.ratingType == 'ATMOSPHERE').length]?.rating : 0}
                                emptySymbol={<img src={Star} className="icon" />}
                                fullSymbol={<img src={StarFill} className="icon" />}
                                onClick={(e) => handleUpdateRate(e, 'ATMOSPHERE')}
                            />
                        </div>
                        <div className="content-rate-content">
                            <Rating
                                initialRating={rates ? rates.filter(x => x.ratingType == 'SERVICE')[rates.filter(x => x.ratingType == 'SERVICE').length]?.rating : 0}
                                emptySymbol={<img src={Star} className="icon" />}
                                fullSymbol={<img src={StarFill} className="icon" />}
                                onClick={(e) => handleUpdateRate(e, 'SERVICE')}
                            />
                        </div>
                        <div className="content-rate-content">
                            <Rating
                                initialRating={rates ? rates.filter(x => x.ratingType == 'FOOD_QUALITY')[rates.filter(x => x.ratingType == 'FOOD_QUALITY').length]?.rating : 0}
                                emptySymbol={<img src={Star} className="icon" />}
                                fullSymbol={<img src={StarFill} className="icon" />}
                                onClick={(e) => handleUpdateRate(e, 'FOOD_QUALITY')}
                            />
                        </div>
                    </div>
                </div>
                <div className="food-wrapper">
                    <div className="title">
                        Предлагани храни:
                    </div>
                    {restaurant?.foods &&
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
                        <div className="">
                            Коментари
                        </div>
                        <div>
                            <img onClick={handleOpenDialog} className="add-comment-image" src={PlusCircleIcon} />
                        </div>
                    </div>
                    <div className="content">
                        {comments &&
                            comments.map((x, index) => {
                                return (
                                    <div className="comment-wrapper">
                                        <div className="comment">
                                            {x.comment}
                                            {x.userId == result._id &&
                                                <button className="remove-button" key={`0${index}`} onClick={() => handleRemoveComment(index, x.id)}> <XIcon /> </button>
                                            }
                                        </div>
                                        {(result.role == USER_TYPE.ADMIN || result.role == USER_TYPE.MODERATOR) &&
                                            <Button onClick={() => history.push('/block')}>
                                                Блокиране
                                            </ Button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <AddCommentDialog
                handleClose={handleCloseDialog}
                isOpen={isDialogOpen}
                restaurantId={restaurantId}
                handleSendComment={handleSendComment}
            />

        </div >
    )
};

export default RestaurantPage;
