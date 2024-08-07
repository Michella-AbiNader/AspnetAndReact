/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
const UserContext = createContext()
export default UserContext;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(()=> {
    // Retrieve user info from localStorage if available
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
    });


    useEffect(() => {
        // Save user info to localStorage whenever it changes
        if (user && user.token) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}