import {  useState, useContext } from 'react';
import React from 'react';

export const UserContext = React.createContext([]);

export const UseUserContext = () => useContext(UserContext) ;
    
 const UserProvider = ({children}) => {   
  
    const [userAvatar, setUserAvatar] = useState('');
     console.log(setUserAvatar);
    return (
        <UserContext.Provider value={{ userAvatar, setUserAvatar }}>
            userAvatar, setUserAvatar
        {children}
        </UserContext.Provider>
    );
};
export default UserProvider;