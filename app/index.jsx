import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import { AuthContext } from '../context/AuthContext'; // Make sure to import your AuthContext
import api from '../lib/api'; // Make sure to import your api.js

const App = () => {
  // const { setAuthTokens } = useContext(AuthContext); // Use the context to manage auth tokens
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    axios.get('http://192.168.171.61:8000/api/example/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  // fields = ('username', 'email', 'password', 'password2')

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleSignup = () => {
    // Check if passwords match
    if (form.password !== form.password2) {
      alert('Passwords do not match.');
      return;
    }
    console.log(form);
    
    // Send signup request
    api.post('/api/register/', {
      username: form.username,
      email: form.email,
      password: form.password,
      password2: form.password2,
    })
    .then(response => {
      // Handle successful signup
      alert('Signup successful!');
      console.log(response.data);
      
      // setAuthTokens(response.data); // Save tokens to context
      // Optionally, navigate to another screen
    })
    .catch(error => {
      console.log(error);
      alert('Signup failed. Please check your details and try again.');
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <KeyboardAwareScrollView contentContainerClassName="py-6">
        <View className="px-6">
          <View className="mb-6">
            <View className="p-2 -ml-4">
              <FeatherIcon color="#1D2A32" name="chevron-left" size={30} />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Let's Get Started!
            </Text>
            <Text className="text-base font-medium text-gray-500">
              Fill in the fields below to get started with your new account.
            </Text>
          </View>

          <View className="mb-6">
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Full Name
              </Text>
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={username => setForm({ ...form, username })}
                placeholder="John Doe"
                placeholderTextColor="#6b7280"
                className="h-12 bg-white px-4 rounded-lg text-base font-medium text-gray-900 border border-gray-300"
                value={form.username}
              />
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Email Address
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                className="h-12 bg-white px-4 rounded-lg text-base font-medium text-gray-900 border border-gray-300"
                value={form.email}
              />
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Password
              </Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                className="h-12 bg-white px-4 rounded-lg text-base font-medium text-gray-900 border border-gray-300"
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Password
              </Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password2 =>
                  setForm({ ...form, password2 })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                className="h-12 bg-white px-4 rounded-lg text-base font-medium text-gray-900 border border-gray-300"
                secureTextEntry={true}
                value={form.password2}
              />
            </View>

            <View className="mt-1 mb-4">
              <TouchableOpacity onPress={handleSignup}>
                <View className="flex-row items-center justify-center rounded-full py-3 px-5 bg-blue-600 border border-blue-600">
                  <Text className="text-lg font-semibold text-white">
                    Get Started
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          // handle link to sign in
        }}>
        <Text className="py-6 text-center text-base font-semibold text-gray-900">
          Already have an account?{' '}
          <Text className="underline">Sign in</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
