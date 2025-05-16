import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'solid' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'solid',
  size = 'md',
}) => {
  // Define styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return {
          container: disabled
            ? 'bg-gray-700 opacity-50'
            : 'bg-indigo-600 active:bg-indigo-700',
          text: 'text-white',
          icon: '#FFFFFF',
        };
      case 'outline':
        return {
          container: disabled
            ? 'border border-gray-700 opacity-50'
            : 'border border-indigo-500 active:bg-indigo-900/20',
          text: disabled ? 'text-gray-500' : 'text-indigo-400',
          icon: disabled ? '#6B7280' : '#818CF8',
        };
      case 'subtle':
      default:
        return {
          container: disabled
            ? 'bg-transparent opacity-50'
            : 'bg-transparent active:bg-gray-800',
          text: disabled ? 'text-gray-600' : 'text-gray-300',
          icon: disabled ? '#4B5563' : '#D1D5DB',
        };
    }
  };

  // Define styles based on size
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1',
          text: 'text-xs',
          iconSize: 16,
        };
      case 'lg':
        return {
          container: 'px-4 py-3',
          text: 'text-base',
          iconSize: 24,
        };
      case 'md':
      default:
        return {
          container: 'px-3 py-2',
          text: 'text-sm',
          iconSize: 20,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center rounded-lg ${variantStyles.container} ${sizeStyles.container}`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#818CF8" className="mr-2" />
      ) : (
        <MaterialIcons
          name={icon}
          size={sizeStyles.iconSize}
          color={variantStyles.icon}
          style={{ marginRight: 4 }}
        />
      )}
      <Text className={`font-medium ${variantStyles.text} ${sizeStyles.text}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};