import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity className="w-full mt-7"
      onPress={handlePress}
      activeOpacity={0.7}
      // style={containerStyles} // Apply width and marginTop here
    >
      <View className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${isLoading? "opacity-50" : ""}`} disabled={isLoading}>
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;