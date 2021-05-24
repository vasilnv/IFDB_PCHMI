import React from 'react';

import { Form, Button } from 'react-bootstrap';
import { ErrorMessage } from 'formik';

const MyAccountFormView = ({
    handleSubmit,
    handleChange,
    values,
    touched,
    setFieldValue,
    errors,
    inputFilesRef,
    handleDeleteUser,
}) => {
    return (
        <Form className="form-my-account" onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Потребителско име</Form.Label>
                <Form.Control
                    type="text"
                    disabled
                    className="input-field username"
                    placeholder="Потребителско име"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username && touched.username}
                />
                <ErrorMessage name="username" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Промяна на парола</Form.Label>
                <Form.Control
                    type="password"
                    className="input-field password"
                    placeholder="Парола"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password && touched.password}
                />
                <ErrorMessage name="password" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formPasswordNew">
                <Form.Label>Потвърди парола</Form.Label>
                <Form.Control
                    type="password"
                    className="input-field passwordNew"
                    placeholder="Парола"
                    name="passwordNew"
                    onChange={handleChange}
                    value={values.passwordNew}
                    isValid={touched.passwordNew && !errors.passwordNew}
                    isInvalid={!!errors.passwordNew && touched.passwordNew}
                />
                <ErrorMessage name="passwordNew" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Промяна на email</Form.Label>
                <Form.Control
                    type="text"
                    className="input-field name"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email && touched.email}
                />
                <ErrorMessage name="email" component="div" className="invalid-field-message" />
            </Form.Group>
            <div className="first-btn">
                <Button variant="primary" type="button" className="delete-form-btn" onClick={handleDeleteUser}>
                    Изтриване на акаунт
                </Button>
            </div>
            <Button variant="primary" type="submit" className="submit-form-btn">
                Запазване на промените
            </Button>
        </Form>
    )
};

export default MyAccountFormView;
