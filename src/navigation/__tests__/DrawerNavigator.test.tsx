import React from 'react';
import {screen, fireEvent, act} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {renderWithProviders} from '@/utils/test-utils';
import {startServer} from '@/mock-api/server';
import {server} from '@/config';
import {RootState} from '@/store/store';
import {MAIN_ROUTES} from '@/navigation/types';

import {DrawerNavigator} from '../DrawerNavigator';

const preloadedState: Pick<RootState, 'auth'> = {
  auth: {
    isAuthenticated: true,
    member: null,
    token: null,
    authState: 'init',
    signUpState: 'init',
  },
};

describe('DrawerNavigator', () => {
  beforeEach(() => {
    startServer();
  });

  afterEach(() => {
    server.initialised?.shutdown();
  });

  it('renders correctly', () => {
    renderWithProviders(
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>,
    );
  });

  it('can navigate using bottom tabs', async () => {
    jest.useFakeTimers();
    renderWithProviders(
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>,
      {preloadedState},
    );

    expect(await screen.findByText(/loading/i)).toBeOnTheScreen();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(await screen.findByText(/HOME/)).toBeOnTheScreen();

    fireEvent.press(screen.getByText(MAIN_ROUTES.SPEND));
    expect(await screen.findByText(/SPEND/)).toBeOnTheScreen();

    fireEvent.press(screen.getByText(MAIN_ROUTES.COLLECT));
    expect(await screen.findByText(/COLLECT/)).toBeOnTheScreen();

    fireEvent.press(screen.getByText(MAIN_ROUTES.ACCOUNT));
    expect(await screen.findByText(/My Account/)).toBeOnTheScreen();
  });
});
