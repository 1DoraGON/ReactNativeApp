// src/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.171.61:8000/api/'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  
  async (config) => {
    console.log("mehari 2");
    const token = await AsyncStorage.getItem('access_token');

    
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },

  (error) => Promise.reject(error)
);

// Optionally, handle token refresh here using response interceptors

export default api;
