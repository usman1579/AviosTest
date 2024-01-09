import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {HomeScreen} from '@/screens/HomeScreen';
import {SpendScreen} from '@/screens/SpendScreen';
import {CollectScreen} from '@/screens/CollectScreen';
import {AccountScreen} from '@/screens/AccountScreen';
import {TabStackParamList, MAIN_ROUTES} from './types';

const Tab = createBottomTabNavigator<TabStackParamList>();

function SetTabBarIcon(routeName: string, focused: boolean, color: string, size: number) {
  let iconName = '';
  if (routeName === 'Home') {
    iconName = focused ? 'home-sharp' : 'home-outline';
  } else if (routeName === 'Spend') {
    iconName = focused ? 'airplane' : 'airplane-outline';
  } else if (routeName === 'Collect') {
    iconName = focused ? 'wallet' : 'wallet-outline';
  } else if (routeName === 'Account') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => SetTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: '#075AAA',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen name={MAIN_ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={MAIN_ROUTES.SPEND} component={SpendScreen} />
      <Tab.Screen name={MAIN_ROUTES.COLLECT} component={CollectScreen} />
      <Tab.Screen name={MAIN_ROUTES.ACCOUNT} component={AccountScreen} />
    </Tab.Navigator>
  );
}
