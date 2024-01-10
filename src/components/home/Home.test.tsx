import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Home } from './Home'; // Adjust the import path based on your project structure
import { MAIN_ROUTES } from '@/navigation/types';

// Mocking the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock the useSelector hook
jest.mock('@/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

describe('Home component', () => {
  // Reset the mock before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    // Mock the useSelector hook to return a dummy member
    jest.mock('@/slices/auth', () => ({
      selectMember: jest.fn(),
    }));

    // Import the mocked Home component after mocking the useSelector hook
    const { toJSON } = render(<Home navigation={mockNavigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('navigates to ACCOUNT screen on press', () => {
    // Mock the useSelector hook to return a dummy member
    jest.mock('@/slices/auth', () => ({
      selectMember: jest.fn(() => ({ firstName: 'John', avios: 100 })), //dummy data as needed
    }));

    const { getByTestId } = render(<Home navigation={mockNavigation} />);
    const touchableButton = getByTestId('TouchPress');

    fireEvent.press(touchableButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(MAIN_ROUTES.ACCOUNT);
  });
});
