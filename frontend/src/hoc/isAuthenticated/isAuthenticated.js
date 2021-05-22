import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const isAuthenticated = Component => {
    const User = () => 
    {
        const history = useHistory();
        const { currentUser } = useAuth();

        useEffect(() => {
            if(!currentUser) {
                history.push('/authorization')
            }
        });
        return (
            <> 
                { currentUser ? <Component /> : null}
            </>
        )
    }

    return User;
};

export default isAuthenticated;
