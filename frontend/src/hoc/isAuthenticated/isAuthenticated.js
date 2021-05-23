import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const isAuthenticated = (Component, userRoles) => {
    const User = () => 
    {
        const history = useHistory();
        const { currentUser } = useAuth();
        const newCookies = document.cookie.split(';');

        let result = {};
        newCookies.map((x) => {
            if(x) {
                const data = x.split('=');
                result[data[0].trim()] = data[1].trim();
            }
        }, {})

        useEffect(() => {
            if(!result._id || !userRoles.includes(result.role)) {
                history.push('/authorization')
            }
        });

        return (
            <> 
                { result._id ? <Component /> : null}
            </>
        )
    }

    return User;
};

export default isAuthenticated;
