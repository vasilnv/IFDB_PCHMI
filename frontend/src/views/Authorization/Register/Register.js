import React, { useState } from 'react';

//import { login, signup } from '../../../utils/authFunctions' 
import userService from '../../../services/userService' 

import RegisterForm from './RegisterForm';

import './Register.scss'

const Register = (
) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleRegister = async (userData) => {
        await userService.register(userData);
    };

    const handleLogin = async (userData) => {
        await userService.login(userData);
    }

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
