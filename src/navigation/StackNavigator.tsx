import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {useAppSelector} from '@/store/hooks';
import {selectIsAuthenticated} from '@/slices/auth';
import {StackParamList, MAIN_ROUTES} from './types';
import {SplashScreen} from '@/screens/SplashScreen';
import {AppLoadingScreen} from '@/screens/AppLoadingScreen';
import {SignInScreen} from '@/screens/SignInScreen';
import {SignUpScreen} from '@/screens/SignUpScreen';

const Stack = createStackNavigator<StackParamList>();

export function StackNavigator() {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn && (
        <>
          <Stack.Screen name={MAIN_ROUTES.APP_LOADING} component={AppLoadingScreen} />
          <Stack.Screen name="Main" component={TabNavigator} />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Stack.Screen name={MAIN_ROUTES.SPLASH} component={SplashScreen} />
          <Stack.Screen name={MAIN_ROUTES.SIGN_IN} component={SignInScreen} />
          <Stack.Screen name={MAIN_ROUTES.SIGN_UP} component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
