import Constants from '../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getToken=async()=>{
  return await AsyncStorage.getItem('jwt');
  };

const ProductService = {
  SaveProduct: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/SaveProduct`, {
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
      console.log(error);w
      throw error;
    }
  },
  CategorySelectOptions: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/CategorySelectOptions`, {
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
      console.log(error);w
      throw error;
    }
  },
  GetProductById: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/GetProductById`, {
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
      console.log(error);w
      throw error;
    }
  },
  GetProductsForAdmin: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/GetProductsForAdmin`, {
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
      console.log(error);w
      throw error;
    }
  },
  SaveCategory: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/SaveCategory`, {
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
      console.log(error);w
      throw error;
    }
  },
  GetCategories: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/GetCategories`, {
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
      console.log(error);w
      throw error;
    }
  },
  GetCategoryById: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/GetCategoryById`, {
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
      console.log(error);w
      throw error;
    }
  },
  GetProducts: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/GetProducts`, {
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
      console.log(error);w
      throw error;
    }
  },
  GetProductForCustomer: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/GetProductForCustomer`, {
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
      console.log(error);w
      throw error;
    }
  },
};

export default ProductService;