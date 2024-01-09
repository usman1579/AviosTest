import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './StackNavigator';
import {DrawerParamList, MAIN_ROUTES} from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      screenOptions={{
        // swipeEnabled: false,
        drawerStyle: {
          width: '100%',
        },
        drawerPosition: 'right',
        headerShown: false,
        drawerType: 'back',
        unmountOnBlur: true,
      }}>
      <Drawer.Screen name={MAIN_ROUTES.HOME} component={StackNavigator} />
    </Drawer.Navigator>
  );
}
