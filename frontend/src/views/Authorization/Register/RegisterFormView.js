import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { ErrorMessage } from 'formik';

import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterFormView.scss';

const RegisterFormView = ({
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    isLogin,
    loading,
}) => {
    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Control
                    type="text"
                    className="input-field username"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username && touched.username}
                />
                <ErrorMessage name="username" component="div" className="invalid-field-message" />
            </Form.Group>
            {!isLogin &&
                <Form.Group controlId="formEmail">
                    <Form.Control
                        type="email"
                        className="input-field email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email && touched.email}
                    />
                    <ErrorMessage name="email" component="div" className="invalid-field-message" />
                </Form.Group>
            }
            <Form.Group controlId="formPassword">
                <Form.Control
                    type="password"
                    className="input-field password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password && touched.password}
                />
                <ErrorMessage name="password" component="div" className="invalid-field-message" />
            </Form.Group>
            <Button disabled={loading} variant="primary" type="submit" className="register-form-btn">
                {isLogin ? "Log In" : "Sign Up"}
            </Button>
        </Form>
    )
}

export default RegisterFormView;
