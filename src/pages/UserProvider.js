import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export function UserProvider({children}) {
    const [username, setUsername] = useState('JohnDoe'); // Default or dynamic username

    return (
        <UserContext.Provider value={{username, setUsername}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
