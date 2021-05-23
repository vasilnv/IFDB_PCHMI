import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const isGuest = Component => {
    const Guest = () => 
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
            if(result._id) {
                history.push('/')
            }
        });
        return (
            <> 
                { !result._id ? <Component /> : null}
            </>
        )
    }

    return Guest;
};

export default isGuest;
