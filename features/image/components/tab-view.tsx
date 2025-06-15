import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Tab {
  key: string;
  title: string;
}

interface TabViewProps {
  tabs: Tab[];
  selectedTab: string;
  onTabChange: (tabKey: string) => void;
}

export const TabView: React.FC<TabViewProps> = ({ 
  tabs, 
  selectedTab, 
  onTabChange 
}) => {
  return (
    <View className="flex-row border-b border-gray-800">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.key;
        
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className={`flex-1 py-3 px-2 ${isActive ? 'border-b-2 border-indigo-500' : ''}`}
            activeOpacity={0.7}
          >
            <Text 
              className={`text-center font-medium ${
                isActive ? 'text-indigo-400' : 'text-gray-400'
              }`}
            >
              {tab.title}
            </Text>
            
            {isActive && (
              <Animated.View 
                entering={FadeIn.duration(300)}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
