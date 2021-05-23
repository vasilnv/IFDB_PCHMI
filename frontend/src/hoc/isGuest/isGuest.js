import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const isGuest = Component => {
    const Guest = () => 
    {
        const history = useHistory();
        const { currentUser } = useAuth();

        useEffect(() => {
            if(currentUser._id) {
                history.push('/')
            }
        });
        return (
            <> 
                { !currentUser._id ? <Component /> : null}
            </>
        )
    }

    return Guest;
};

export default isGuest;
