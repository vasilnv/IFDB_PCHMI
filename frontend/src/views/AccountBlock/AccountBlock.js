import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray } from 'formik';

import { ReactComponent as XIcon } from 'assets/x.svg';
import userService from 'services/userService';

import './AccountBlock.scss';

const AccountBlock = ({

}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getUsers().then(x => setUsers(x));
    }, [])

    const addAccount = (value, setFieldValue, values) => {
        const accountSet = new Set(values.accounts);
        accountSet.add(value);
        setFieldValue('accounts', Array.from(accountSet));
    };

    const removeAccount = (index, values) => {
        values.accounts.splice(index, 1);
    };

    return (
        <div className="account-block-page-wrapper">
            <div className="header-wrapper">
                <h1 className="header-title"> Блокиране на потребители </h1>
            </div>
            <Formik
                initialValues={{
                    accounts: [],
                }}
                onSubmit={async (values) => {
                    const userId = 45;
                    console.log(userId, values)
                    userService.blockAccounts({userIds: values.accounts});
                }}
            >
                {(props) =>
                    <Form className="form-block-user" onSubmit={props.handleSubmit}>
                        <Form.Group controlId="formAccounts">
                            <Form.Label>Избери потребители за блокиране</Form.Label>
                            <Form.Control as="select" onChange={(e) => addAccount(e.target.options[e.target.selectedIndex].value, props.setFieldValue, props.values)}>
                                {
                                    users.map((x, index) => {
                                        return <option key={index} value={`${x.id}`}>{x.username}</option>
                                    })
                                }
                            </Form.Control>
                            <FieldArray
                                name="accounts"
                                render={arrayHelpers => (
                                    <div>
                                        {props.values.accounts && props.values.accounts.length > 0 &&
                                            props.values.accounts.map((account, index) => (
                                                <div key={`02${index}`} className="account-field">
                                                    <div key={index}>
                                                        {account}
                                                    </div>
                                                    <button className="remove-button" key={`0${index}`} onClick={() => removeAccount(index, props.values)}> <XIcon /> </button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            />
                            <ErrorMessage name="accounts" component="div" className="invalid-field-message" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="form-btn">
                            Блокиране на потребители
                        </Button>
                        <Button variant="primary" type="button" className="form-cancel-btn" onClick={() => props.setFieldValue('accounts', [])}>
                            Отказ
                        </Button>
                    </Form>
                }
            </Formik>
        </div>
    )
};

export default AccountBlock;
