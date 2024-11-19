import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export function UserProvider({children}) {
    const [user, setUser] = useState({userId: 1, username: 'Leonard123'}); // Default or dynamic username

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
