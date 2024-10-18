import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../lib/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track loading

  const login = async (username, password) => {
    try {
      const response = await api.post('token/', { username, password });
      const tokens = response.data;
      setAuthTokens(tokens);
      setIsAuthenticated(true); // Set authenticated to true on successful login
      await AsyncStorage.setItem('access_token', tokens.access);
      await AsyncStorage.setItem('refresh_token', tokens.refresh);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const register = async (username, email, password, password2) => {
    try {
      const response = await api.post('register/', { username, email, password, password2 });
      await login(username, password); // Optionally, auto-login after registration
    } catch (error) {
      console.error('Registration error', error);
      throw error;
    }
  };

  const logout = async () => {
    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false); // Set authenticated to false on logout
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  };

  const isLoggedIn = async () => {
    try {
      const access = await AsyncStorage.getItem('access_token');
      const refresh = await AsyncStorage.getItem('refresh_token');
      
      if (access && refresh) {
        setAuthTokens({ access, refresh });
        setIsAuthenticated(true); // Set authenticated to true if tokens are found
      } else {
        setIsAuthenticated(false); // Set authenticated to false if no tokens
      }
    } catch (e) {
      console.log('Is logged in error', e);
    } finally {
      setLoading(false); // Set loading to false once the check is complete
    }
  };

  useEffect(() => {
    isLoggedIn(); // Check if the user is logged in when the app loads
  }, []);

  // Track changes to `isAuthenticated`
  useEffect(() => {
    console.log('Authentication status changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, user, setUser, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
