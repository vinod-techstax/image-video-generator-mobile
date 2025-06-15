import '@/global.css';

import { Theme, ThemeProvider, DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/lib/use-color-scheme';
import { QueryProvider } from '@/providers/query-provider';
import { Header } from '@/components/custom/header';
import { PortalHost } from '@rn-primitives/portal';
import { DrawerNavigator } from '@/components/drawer/drawer-navigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (

    <QueryProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <GestureHandlerRootView style={{ flex: 1 }} className='pt-10'>
          <SafeAreaProvider>
            <DrawerNavigator />
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryProvider>
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <SafeAreaProvider>
    //     <NavigationContainer>
    //       <DrawerNavigator />
    //     </NavigationContainer>
    //     <StatusBar style="auto" />
    //   </SafeAreaProvider>
    // </GestureHandlerRootView>


    // <QueryProvider>
    //   <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
    //     <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
    //     <SafeAreaView className="flex-1 bg-background dark:bg-background-dark pt-8">
    //       <DrawerNavigator />
    //       {/* <Stack>
    //         <Stack.Screen
    //           name='index'
    //           options={{ headerShown: false }}
    //         />
    //       </Stack> */}
    //       {/* <PortalHost /> */}
    //     </SafeAreaView>
    //   </ThemeProvider>
    // </QueryProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
