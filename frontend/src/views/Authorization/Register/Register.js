import React, { useState } from 'react';
import { useHistory } from 'react-router';
//import { login, signup } from '../../../utils/authFunctions' 
import userService from '../../../services/userService' 

import RegisterForm from './RegisterForm';

import './Register.scss'

const Register = (
) => {
    const [isLogin, setIsLogin] = useState(true);
    let history = useHistory();

    const handleRegister = async (userData) => {
        userService.register(userData);
        setIsLogin(true);
    };

    const handleLogin = async (userData) => {
        try {
            const newUserData = await userService.login(userData.username, userData.password);
            document.cookie = `username=${newUserData.username}`;
            document.cookie = `email=${newUserData.email}`;
            document.cookie = `_id=${newUserData.id}`;
            document.cookie = `isBlocked=${newUserData.isBlocked}`;
            document.cookie = `role=${newUserData.userType}`;
            history.push("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="header-wrapper">
                <h1 className="register-title"> { isLogin ? "Влез в IFDb" : "Регистрирай се в IFDb" }</h1>
                <div className="register-subtitle-wrapper">
                    <h5 className="register-subtitle"> { isLogin ? "Нямаш акаунт?" : "Вече имаш акаунт?"}</h5>
                    <button className="register-login-link-btn" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Регистрация" : "Вход"}</button>
                </div>
            </div>
            <div className="register-form-wrapper">
                <RegisterForm
                    isLogin={isLogin}
                    handleRegister={handleRegister}
                    handleLogin={handleLogin}
                />
            </div>
        </div>
    )
} 

export default Register
