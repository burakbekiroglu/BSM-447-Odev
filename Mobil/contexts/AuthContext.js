import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = (authToken, type) => {
    setToken(authToken);
    setUserType(type);
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };