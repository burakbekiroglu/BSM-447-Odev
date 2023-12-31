import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken=async()=>{
return await AsyncStorage.getItem('jwt');
};

const CartService = {
    SaveCartItem: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/cart/SaveCartItem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
    }
  },
  GetCartDetailByUserId: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/cart/GetCartDetailByUserId`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
    }
  },
  DeleteCardById: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/cart/DeleteCardById`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
    }
  },
};

export default CartService;