import React, { useState, useContext, useEffect } from 'react'

import userService from '../services/userService'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({
    children
}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    //const getUserByEmail = async (user) => setCurrentUser((await userService.getUserByEmail(user.email))[0]);
    const cookies = document.cookie;
    const newCookies = document.cookie.split(';');
    
    
    useEffect(() => {
        let result = {};
        newCookies.map((x) => {
            if(x) {
                const data = x.split('=');
                result[data[0].trim()] = data[1].trim();
            }
        }, {})

        setCurrentUser(result);

    }, [cookies])

    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};
