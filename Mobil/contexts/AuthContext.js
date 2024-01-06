import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/AuthService';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
 const [user,setUser]=useState(null);
 const [isLoading,setIsLoading]=useState(false);



  const logout = async () => {
    await AsyncStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
  };

  const initial=async()=>{
    setIsLoading(true);

    await AsyncStorage.setItem('jwt', token);
    const response = await AuthService.GetUserByToken();
    setIsLoading(false);
    if(response && !response.Error){
      setUser(response.data);
    }
  };

  const getToken=async()=>{
    const  tkn=await AsyncStorage.getItem('jwt');
    if(tkn)setToken(tkn);
  
  };

  useEffect(()=>{
    (async()=>{ 
      if(token){
        await initial();
      }
    })();
  },[token]);

  useLayoutEffect(()=>{
    (async()=>{
      await getToken();
    })();
  },[]);

  

  return (
    <AuthContext.Provider value={{ token,setToken,setUser,user, logout }}>
      {isLoading?(<ActivityIndicator size="large" color="#0000ff" style={{flexDirection:"row" }} />):(children)}
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