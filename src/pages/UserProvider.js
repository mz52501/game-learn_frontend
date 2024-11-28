import React, {createContext, useContext, useState, useEffect} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Derived isAuthenticated state
    const isAuthenticated = !!user;

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
