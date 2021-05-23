import React from 'react';

import { Formik } from 'formik';

import userService from 'services/userService';
import MyAccountFormView from './MyAccountFormView';

const MyAccountForm = ({

}) => {

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                passwordNew: '',
                email: '',
            }}
            onSubmit={async (values) => {

                console.log(values);
            }}
        >
            {(props) =>
                <MyAccountFormView
                    {...props}
                />
            }
        </Formik>
    )
};

export default MyAccountForm;
