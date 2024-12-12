// src/Contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import HttpService from '../../Services/http';

// Create a Context for Authentication
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a Provider component
export const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);  // Initialize userData as null
  const login = async (identifier, homePageRedirect, isRemembered, responseToken) => {
    const storage = isRemembered ? localStorage : sessionStorage;
    storage.setItem('AUTH_TOKEN', responseToken);
    storage.setItem('identifier', identifier);
    var https = new HttpService();
    var userInfo = await https.get(`user/emailOrPhone/${identifier}`)
    if(userInfo.success)
    {
        setIsAuthenticated(true);
        // navigate('/');
        homePageRedirect();
    }
    
    console.log('Ui' ,userInfo)
    setUserData(userInfo?.data);  // Set the user data when logged in
  };
  // const fetchUserData = async (identifier) =>{
  //   var https = new HttpService();
  //   var userInfo = await https.get(`user/emailOrPhone/${identifier}`)
  //   // if(userInfo.success)
  //   // {
  //   //     setIsAuthenticated(true);
  //   //     // navigate('/');
  //   // }
    
  //   console.log('Ui' ,userInfo)
  //   setUserData(userInfo?.data);
  // }
  const logout = () => {
    setUserData(null);  // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
