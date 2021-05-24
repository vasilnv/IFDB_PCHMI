import React from 'react';

import { Formik } from 'formik';

import userService from 'services/userService';
import MyAccountFormView from './MyAccountFormView';

const MyAccountForm = ({

}) => {

    const newCookies = document.cookie.split(';');

    let result = {};
    newCookies.map((x) => {
        if(x) {
            const data = x.split('=');
            result[data[0].trim()] = data[1].trim();
        }
    }, {})

    const handleDeleteUser = () => {
        userService.deleteUser({id: result._id});
    };

    return (
        <Formik
            initialValues={{
                username: result.username || '',
                password: '',
                passwordNew: '',
                email: result.email || '',
            }}
            onSubmit={async (values) => {
                userService.changeCredentials({...values, id: result._id});
            }}
        >
            {(props) =>
                <MyAccountFormView
                    {...props}
                    handleDeleteUser={handleDeleteUser}
                />
            }
        </Formik>
    )
};

export default MyAccountForm;
