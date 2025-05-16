import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description 
}) => {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="bg-gray-800/50 rounded-full p-5 mb-4">
        <MaterialIcons name={icon} size={40} color="#818CF8" />
      </View>
      
      <Text className="text-lg font-medium text-gray-100 text-center mb-2">
        {title}
      </Text>
      
      <Text className="text-gray-400 text-center">
        {description}
      </Text>
    </View>
  );
};
