import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '@/components/drawer/custom-drawer';
import { Header } from '@/components/custom/header';
import { navigationItems } from '@/constants/drawer-navigation-items';

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
        {navigationItems.map((item) => (
          <Drawer.Screen key={item.route} name={item.route} component={item.component} />
        ))}
      </Drawer.Navigator>
  );
}