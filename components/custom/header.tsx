import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { MenuIcon } from 'lucide-react-native';
import { ThemeToggle } from '../theme-toggle';
import { Text } from '../ui/text';

type HeaderProps = {
  title: string;
  rightElement?: React.ReactNode;
};

export function Header({ title, rightElement }: HeaderProps) {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className="flex-row mt-10 items-center justify-between py-3 px-4 border-b border-gray-200 dark:border-gray-700 bg-background">
      <TouchableOpacity 
        onPress={handleOpenDrawer}
        className="w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700"
        activeOpacity={0.7}
      >
        <MenuIcon size={24} color="#4b5563" className="dark:text-gray-300" />
      </TouchableOpacity>
      
      <Text className="text-lg font-bold ">
        {title}
      </Text>

      <View className="flex-row items-center space-x-4">
        {rightElement}
        <ThemeToggle />
      </View>
    </View>
  );
}