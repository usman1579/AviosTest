import React from 'react';
import {screen, fireEvent, waitFor} from '@testing-library/react-native';
import {faker} from '@faker-js/faker';
import {renderWithProviders} from '@/utils/test-utils';

import {SignUp} from './SignUp';

const mockSignIn = jest.fn();
const mockSignUp = jest.fn();

describe('SignUp', () => {
  it('can submit member details to sign up', async () => {
    renderWithProviders(<SignUp signIn={mockSignIn} signUp={mockSignUp} />);

    expect(await screen.findByPlaceholderText(/^first name$/i)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/^last name$/i)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/^email$/i)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/^confirm password$/i)).toBeOnTheScreen();

    expect(screen.getByRole('button', {name: /sign up/i})).toBeDisabled();

    // create member
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({firstName, lastName});
    const password = faker.internet.password({length: 9});

    fireEvent.changeText(screen.getByPlaceholderText(/^first name$/i), firstName);
    fireEvent.changeText(screen.getByPlaceholderText(/^last name$/i), lastName);
    fireEvent.changeText(screen.getByPlaceholderText(/^email$/i), email);
    fireEvent.changeText(screen.getByPlaceholderText(/^password$/i), password);
    fireEvent.changeText(screen.getByPlaceholderText(/^confirm password$/i), password);

    expect(await screen.findByRole('button', {name: /sign up/i})).not.toBeDisabled();
    fireEvent.press(screen.getByRole('button', {name: /sign up/i}));

    await waitFor(() =>
      expect(mockSignUp).toHaveBeenCalledWith(firstName, lastName, email, password),
    );
  });
});
