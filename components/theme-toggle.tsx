import { Animated, Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '@/lib/android-navigation-bar';
import { MoonStar } from '@/lib/icons/MoonStar';
import { Sun } from '@/lib/icons/Sun';
import { useColorScheme } from '@/lib/use-color-scheme';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Update animation when theme changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: isDarkColorScheme ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDarkColorScheme]);

  const interpolatedRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <Pressable
      onPress={toggleColorScheme}
      accessibilityRole="switch"
      accessibilityLabel={`Switch to ${isDarkColorScheme ? 'light' : 'dark'} mode`}
      accessibilityState={{ checked: isDarkColorScheme }}
      className="web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            'p-2 rounded-full flex items-center justify-center',
            isDarkColorScheme 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-slate-100 border border-slate-200',
            pressed && 'opacity-70'
          )}
        >
          <Animated.View
            style={{
              transform: [
                { rotate: interpolatedRotate },
                { scale: scaleAnim }
              ]
            }}
          >
            {isDarkColorScheme ? (
              <MoonStar 
                className="text-indigo-300" 
                size={18} 
                strokeWidth={1.5} 
              />
            ) : (
              <Sun 
                className="text-orange-600" 
                size={18} 
                strokeWidth={1.5} 
              />
            )}
          </Animated.View>
        </View>
      )}
    </Pressable>
  );
}

// import { Pressable, View } from 'react-native';
// import { setAndroidNavigationBar } from '@/lib/android-navigation-bar';
// import { MoonStar } from '@/lib/icons/MoonStar';
// import { Sun } from '@/lib/icons/Sun';
// import { useColorScheme } from '@/lib/use-color-scheme';
// import { cn } from '@/lib/utils';

// export function ThemeToggle() {
//   const { isDarkColorScheme, setColorScheme } = useColorScheme();

//   function toggleColorScheme() {
//     const newTheme = isDarkColorScheme ? 'light' : 'dark';
//     setColorScheme(newTheme);
//     setAndroidNavigationBar(newTheme);
//   }

//   return (
//     <Pressable
//       onPress={toggleColorScheme}
//       className='w-fit h-fit web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
//     >
//       {({ pressed }) => (
//         <View
//           className={cn(
//             'pt-0.5 web:px-5 bg-red-500 w-32',
//             pressed && 'opacity-70'
//           )}
//         >
//           {isDarkColorScheme ? (
//             <MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
//           ) : (
//             <Sun className='text-foreground' size={24} strokeWidth={1.25} />
//           )}
//         </View>
//       )}
//     </Pressable>
//   );
// }
