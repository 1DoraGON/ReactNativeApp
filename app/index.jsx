import React, { useEffect } from 'react';
import { AuthProvider } from '../context/AuthContext'; // Adjust path if needed
import { Redirect } from 'expo-router';

const App = () => {
  return <Redirect href="/sign-up" />
}


export default App;
