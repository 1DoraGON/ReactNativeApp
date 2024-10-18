import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust path if needed
import { Redirect } from 'expo-router';

const App = () => {
  const { isAuthenticated, loading } = useContext(AuthContext); // Use loading from context

  // Show loading spinner or nothing while the authentication check is ongoing
  if (loading) {
    return null; // You can replace this with a spinner or loading screen component
  }

  // Once loading is complete, redirect based on authentication status
  return isAuthenticated ? <Redirect href="/conversation" /> : <Redirect href="/sign-in" />;
};

export default App;
