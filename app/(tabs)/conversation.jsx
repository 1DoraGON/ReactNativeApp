import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Conversation = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! 😟', sender: 'user' },
    { id: 2, text: 'Hi there!', sender: 'other' },
    { id: 3, text: 'How are you? 😎', sender: 'user' },
    // { id: 1, text: 'صغيرووورة 😟', sender: 'user' },
    // { id: 2, text: 'صنديد 😎', sender: 'other' },
    // { id: 3, text: 'سامحيني😢', sender: 'user' },
  ]);
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  return (
    <View className="flex-1 bg-gray-100 w-full h-full mt-10">
      <ScrollView className="flex-1 px-4 py-2">
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`flex mb-4 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <View
              className={`px-4 py-2 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <Text
                className={`text-base ${msg.sender === 'user' ? 'text-white' : 'text-gray-900'}`}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center px-4 py-2 bg-white border-t border-gray-300">
        <TextInput
          className="flex-1 h-12 px-4 bg-gray-200 rounded-lg text-base"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} className="ml-2">
          <FeatherIcon name="send" size={24} color="#1D4ED8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Conversation;

