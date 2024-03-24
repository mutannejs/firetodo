import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

    const [user, setUser] = useState();

    const validateAuth = () => {
        const navigate = useNavigate();
        useEffect(() => {
            if (!user) navigate('/');
        }, []);
    }

    return (
        <LoginContext.Provider value={{ user, setUser, validateAuth }}>
            {children}
        </LoginContext.Provider>
    )

}