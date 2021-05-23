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

                data.append('name', JSON.stringify(rest.name));
                data.append('description', JSON.stringify(rest.description));
                data.append('address', JSON.stringify(rest.address));
                data.append('foods', JSON.stringify(rest.foods));

                restaurantImage.forEach((file, i) => {
                    data.append(`attachedfile`, file);
                });

                const userId = '2';

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
