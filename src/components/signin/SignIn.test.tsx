import React from 'react';
import {screen, fireEvent, waitFor} from '@testing-library/react-native';
import {faker} from '@faker-js/faker';
import {renderWithProviders} from '@/utils/test-utils';

import {SignIn} from './SignIn';

const mockSignIn = jest.fn();
const mockSignUp = jest.fn();

describe('SignIn', () => {
  it('can submit member details to sign in', async () => {
    renderWithProviders(<SignIn signIn={mockSignIn} signUp={mockSignUp} />);

    expect(await screen.findByPlaceholderText(/^email$/i)).toBeOnTheScreen();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeOnTheScreen();

    expect(screen.getByRole('button', {name: /sign in/i})).toBeDisabled();

    // create member sign in details
    const email = faker.internet.email();
    const password = faker.internet.password({length: 9});

    fireEvent.changeText(screen.getByPlaceholderText(/^email$/i), email);
    fireEvent.changeText(screen.getByPlaceholderText(/^password$/i), password);

    expect(await screen.findByRole('button', {name: /sign in/i})).not.toBeDisabled();
    fireEvent.press(screen.getByRole('button', {name: /sign in/i}));

    await waitFor(() => expect(mockSignUp).toHaveBeenCalledWith(email, password));
  });
});
