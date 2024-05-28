import React, { createContext, useState, useContext } from 'react';
import { loginUser, registerUser } from '../api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const response = await loginUser(email, password);
        if (response.userId) {
            setAuthenticated(true);
            setUser(response.userId);
        } else {
            alert(response.message || 'Login failed');
        }
    };

    const register = async (name, email, password) => {
        const response = await registerUser(name, email, password);
        if (response.message === 'User registered successfully') {
            alert(response.message);
        } else {
            alert('Registration failed');
        }
    };

    const logout = () => {
        setAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
