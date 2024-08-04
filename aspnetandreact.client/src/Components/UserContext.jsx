/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
const UserContext = createContext()
export default UserContext;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}