import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken=async()=>{
return await AsyncStorage.getItem('jwt');
};

const OrderService = {
    Save: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/order/save`, {
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

export default OrderService;