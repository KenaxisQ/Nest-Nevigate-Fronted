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
  const login = async (identifier) => {
    // localStorage.setItem('AUTH_TOKEN', 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkYmU3OGMxOC1iMTk2LTQ2OTItOWFjMS0xY2VhMDdmNGJmNGIiLCJpYXQiOjE3MzM0MTk4MzksImV4cCI6MTczMzQyMzQzOX0.CmqdTEY5aNqJLoK3QZjZAQRhsrxIFlnBJvjYSTIZftszh_fFR_9h2qcEqBmDw-zY');
    var https = new HttpService();
    var userInfo = await https.get(`user/emailOrPhone/${identifier}`)
    if(userInfo.success)
    {
        setIsAuthenticated(true);
    }
    
    console.log('Ui' ,userInfo)
    localStorage.setItem('identifier', identifier);
    setUserData(userInfo);  // Set the user data when logged in
  };

  const logout = () => {
    setUserData(null);  // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
