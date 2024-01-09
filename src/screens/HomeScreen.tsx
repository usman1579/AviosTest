import React from 'react';

import { TabScreenProp, MAIN_ROUTES } from '@/navigation/types';

import { Home } from '@/components/home/Home';

export function HomeScreen({ navigation }: TabScreenProp<typeof MAIN_ROUTES.HOME>) {
  return <Home onPress={() => navigation.navigate(MAIN_ROUTES.ACCOUNT)} />;
}
