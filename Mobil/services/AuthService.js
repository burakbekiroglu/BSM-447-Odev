import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken=async()=>{
return await AsyncStorage.getItem('jwt');
};

const AuthService = {
  register: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/User/Register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
      console.log(error);w
      throw error;
    }
  },
  login: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
      console.log(error);w
      throw error;
    }
  },
  GetUserByToken: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/User/GetUserByToken`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
    }
  },
};

export default AuthService;