import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const TabsLayout = () => {
  return (
    <>
      <Stack
            screenOptions={{
              headerShown: false,
              animation: 'none', // This disables the default animation
            }}
      >

        <Stack.Screen 
          name="conversation"
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen 
          name="create"
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen 
          name="home"
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen 
          name="profile"
          options={{
            headerShown:false
          }}
        />
      </Stack>
      <StatusBar backgroundColor='#161622' style='light' />

    </>
  )
}

export default TabsLayout