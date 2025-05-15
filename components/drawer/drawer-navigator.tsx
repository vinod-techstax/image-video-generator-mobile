import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '@/components/drawer/custom-drawer';
import { Header } from '@/components/custom/header';

// Import your screens
import HomeScreen from '@/screens/home'; // Replace with your actual screens

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
  return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            width: '75%',
            paddingTop: 40
          },
          header: ({ route }) => <Header title={route.name} />,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={HomeScreen} />
        <Drawer.Screen name="Help" component={HomeScreen} />
      </Drawer.Navigator>
  );
}