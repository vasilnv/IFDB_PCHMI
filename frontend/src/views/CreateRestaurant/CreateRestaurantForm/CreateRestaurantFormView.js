import React from 'react';

import { Form, Button } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray } from 'formik';

import { ReactComponent as XIcon } from 'assets/x.svg';

const CreateRestaurantFormView = ({
    handleSubmit,
    handleChange,
    values,
    touched,
    setFieldValue,
    errors,
    inputFilesRef,
}) => {
    const addFood = (value) => {
        const foodsSet = new Set(values.foods);

        foodsSet.add(value);

        setFieldValue('foods', Array.from(foodsSet));
    };

    const removeFoot = (index) => {
        values.foods.splice(index, 1); 
    };

    return (
        <Form className="form-create-restaurant" onSubmit={handleSubmit}>
            <Form.Group controlId="formImage">
                <input hidden type="file" ref={inputFilesRef} onChange={(e) => { setFieldValue('restaurantImage', Array.from(e.target.files)) }}></input>
                <Button type="button" onClick={() => inputFilesRef.current.click()}>Избери снимка</Button>
                <div>{values.restaurantImage ? values.restaurantImage[0].name : 'Име на снимката'}</div>
                <ErrorMessage name="restaurantImage" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formName">
                <Form.Control
                    type="text"
                    className="input-field name"
                    placeholder="Име на ресторант"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name && touched.name}
                />
                <ErrorMessage name="name" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Control
                    type="text"
                    className="input-field description"
                    placeholder="Описание на ресторант"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    isValid={touched.description && !errors.description}
                    isInvalid={!!errors.description && touched.description}
                />
                <ErrorMessage name="description" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formAddress">
                <Form.Control
                    type="text"
                    className="input-field address"
                    placeholder="Адрес"
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    isValid={touched.address && !errors.address}
                    isInvalid={!!errors.address && touched.address}
                />
                <ErrorMessage name="address" component="div" className="invalid-field-message" />
            </Form.Group>
            <Form.Group controlId="formFoods">
                <Form.Label>Добавяне на ястие</Form.Label>
                <Form.Control as="select" onChange={(e) => addFood(e.target.options[e.target.selectedIndex].value)}>
                    <option value="Боб">Боб</option>
                    <option value="Зеле">Зеле</option>
                    <option value="Дробче">Дробче</option>
                    <option value="Тикви">Тикви</option>
                    <option value="Путкава Торта">Путкава Торта</option>
                </Form.Control>
                <FieldArray
                    name="foods"
                    render={arrayHelpers => (
                        <div>
                            {values.foods && values.foods.length > 0 &&
                                values.foods.map((food, index) => (
                                    <div key={`02${index}`} className="food-field">
                                        <div key={index}>
                                            {food}
                                        </div>
                                        <button className="remove-button" key={`0${index}`} onClick={() => removeFoot(index)}> <XIcon /> </button>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                />
                <ErrorMessage name="foods" component="div" className="invalid-field-message" />
            </Form.Group>
            <Button variant="primary" type="submit" className="register-form-btn">
                Запазване на промените
            </Button>
        </Form>
    )
};

export default CreateRestaurantFormView;
