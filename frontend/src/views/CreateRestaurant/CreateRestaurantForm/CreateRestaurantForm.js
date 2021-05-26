import React, { useRef } from 'react';

import { Formik } from 'formik';

import userService from 'services/userService';
import CreateRestaurantFormView from './CreateRestaurantFormView';
import { validateRequestField, validateEmail, validateLength } from '../../../utils/validators';

import './CreateRestaurantForm.scss'

const CreateRestaurantForm = ({

}) => {

    const inputFilesRef = useRef();

    const validationFields = ['restaurantImage', 'name', 'description', 'address', 'foods'];
    const initialValues = { restaurantImage: null, name: '', description: '', address: '', foods: [] };

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                return {
                    ...validateRequestField(values, validationFields),
                }
            }}
            onSubmit={async (values) => {

                const {restaurantImage, ...rest} = values;

                const data = new FormData();

                data.append('name', rest.name);
                data.append('description', rest.description);
                data.append('address', rest.address);
                data.append('foods', rest.foods);

                restaurantImage.forEach((file, i) => {
                    data.append(`attachedfile`, file);
                });

                const newCookies = document.cookie.split(';');

                			    let result = {};
                			    newCookies.map((x) => {
                			        if (x) {
                			            const data = x.split('=');
                			            result[data[0].trim()] = data[1].trim();
                			        }
                			    }, {})

                                const userId = result._id;

                await userService.createRestaurant(userId, data);
            }}
        >
            {(props) =>
                <CreateRestaurantFormView
                    inputFilesRef={inputFilesRef}
                    {...props}
                />
            }
        </Formik>
    )
};

export default CreateRestaurantForm;
