import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://localhost:8080/api" ;

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      // const response = await axios.post(`/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password , name) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });
      // const response = await axios.post(`/auth/register`, { email, password, name });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetPasswordRequest: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/reset/request`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add other authentication-related methods as needed
};

export default AuthService;