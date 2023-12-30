import Constants from '../constants/Constants';


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
};

export default AuthService;