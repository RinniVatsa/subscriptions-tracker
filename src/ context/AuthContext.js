import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './services/firebase';

// Create context
const AuthContext = createContext();

// Hook to use context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Email/password login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout
    const logout = () => {
        return signOut(auth);
    };

    // Listen for auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Once we know user's status
        });

        return () => unsubscribe(); // Clean up listener
    }, []);

    const value = {
        currentUser,
        login,
        logout,
    };

    return ( <
        AuthContext.Provider value = { value } > {!loading && children } <
        /AuthContext.Provider>
    );
};