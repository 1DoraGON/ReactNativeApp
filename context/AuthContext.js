// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await api.post('token/', { username, password });
      const tokens = response.data;
      setAuthTokens(tokens);
      await AsyncStorage.setItem('access_token', tokens.access);
      await AsyncStorage.setItem('refresh_token', tokens.refresh);
      // Optionally, decode token to get user info
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const register = async (username, email, password, password2) => {
    try {
      const response = await api.post('register/', { username, email, password, password2 });
      // Optionally, auto-login after registration
      await login(username, password);
    } catch (error) {
      console.error('Registration error', error);
      throw error;
    }
  };

  const logout = async () => {
    setAuthTokens(null);
    setUser(null);
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  };

  const isLoggedIn = async () => {
    try {
      const access = await AsyncStorage.getItem('access_token');
      const refresh = await AsyncStorage.getItem('refresh_token');
      if (access && refresh) {
        setAuthTokens({ access, refresh });
        // Optionally, decode token to get user info
      }
    } catch (e) {
      console.log('Is logged in error', e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
