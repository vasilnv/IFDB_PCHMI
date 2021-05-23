import React from 'react';

import MyAccountForm from './MyAccountForm';

import './MyAccount.scss';

const MyAccount = ({

}) => {
    return (
        <div className="my-account-page">
            <div className="header-wrapper">
                <h1 className="header-title"> Управление на акаунт </h1>
            </div>
            <div className="my-account-form-wrapper">
                <MyAccountForm

                />
            </div>
        </div>
    )
};

export default MyAccount;
