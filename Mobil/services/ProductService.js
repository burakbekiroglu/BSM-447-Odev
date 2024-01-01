import Constants from '../constants/Constants';


const ProductService = {
    SaveProduct: async (data) => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/SaveProduct`, {
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
  CategorySelectOptions: async () => {
    try {
      const response = await fetch(`${Constants.ServiceUrl}/Product/CategorySelectOptions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
};

export default ProductService;