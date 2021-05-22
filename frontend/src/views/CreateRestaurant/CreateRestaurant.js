import React, { useEffect } from 'react';

import CreateRestaurantForm from './CreateRestaurantForm';

import './CreateRestaurant.scss';

const CreateRestaurant = ({

}) => {

    return (
        <div className="create-restaurant-page">
            <div className="header-wrapper">
                <h1 className="header-title"> Създаване на ресторант </h1>
            </div>
            <div className="create-restaurant-form-wrapper">
                <CreateRestaurantForm

                />
            </div>
        </div>
    );
}

export default CreateRestaurant;
