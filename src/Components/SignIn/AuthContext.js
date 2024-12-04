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
    var https = new HttpService();
    var userInfo = await https.get(`user/emailOrPhone/${identifier}`)
    console.log('Ui' ,userInfo)
    localStorage.setItem('identifier', identifier);
    setUserData(userInfo);  // Set the user data when logged in
  };

  const logout = () => {
    setUserData(null);  // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
