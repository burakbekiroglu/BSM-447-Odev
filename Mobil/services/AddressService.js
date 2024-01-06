import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken=async()=>{
return await AsyncStorage.getItem('jwt');
};

const AddressService = {
  Save: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/address/save`, {
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
  Delete: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/address/Delete`, {
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
  GetUserAddreses: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/address/GetUserAddreses`, {
        method: 'GET',
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
  GetAddressById: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/address/GetAddressById`, {
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
  GetUserAddressSelectOptions: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/address/GetUserAddressSelectOptions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`,
        }
      });

      if (!response.ok) {
        throw new Error('error');
      }
      return await response.json();
    } catch (error) {
    }
  },
};

export default AddressService;