import React from 'react';
import { Formik } from 'formik';

import RegisterFormView from './RegisterFormView';
import { validateRequestField, validateEmail, validateLength } from '../../../utils/validators';

import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = ({
    isLogin,
    handleLogin,
    handleRegister,
    loading,
}) => {
    
    const validationFields = isLogin ? ['username', 'password'] : ['username', 'email', 'password'];
    const initialValues = { username: '', email: '', password: '' };

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                return {
                    ...validateEmail(values, ['email']),
                    ...validateLength(values, [
                        { value: "password", minLength: 8, maxLength: 32 }
                    ]),
                    ...validateRequestField(values, validationFields),
                }
            }}
            onSubmit={async (values) => {
                isLogin ? handleLogin(values) : handleRegister(values);
            }}
        >
            {(props) =>
                <RegisterFormView
                    isLogin={isLogin}
                    loading={loading}
                    {...props}
                />
            }
        </Formik>
    )
}

export default RegisterForm;