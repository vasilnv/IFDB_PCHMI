import React, { useState, useContext, useEffect } from 'react'

import userService from '../services/userService'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({
    children
}) => {
    const [currentUser, setCurrentUser] = useState(false);
    const [loading, setLoading] = useState(true);

    //const getUserByEmail = async (user) => setCurrentUser((await userService.getUserByEmail(user.email))[0]);
    
    useEffect(() => {
        /*const unsubscribe = auth.onIdTokenChanged(async user => {
            if(user) {
                if(!user.emailVerified) {
                    user.sendEmailVerification();
                } else {
                    //wait getUserByEmail(user);
                }
            }
            setLoading(false);
        });*/

        return console.log('Batko');
    }, [])

    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};
