import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Home, styles } from './Home'; // Assuming your component is in the same directory

// Mocking the useSelector hook
jest.mock('@/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

// Mocking the selectMember selector
jest.mock('@/slices/auth', () => ({
  selectMember: jest.fn(),
}));

// Mocking the vector icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

describe('Home component', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    // Mock the useSelector hook to return a sample member
    const mockedMember = {
      firstName: 'John',
      avios: 100,
    };
    require('@/store/hooks').useAppSelector.mockReturnValue(mockedMember);

    const { toJSON } = render(<Home onPress={() => { }} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays correct member information', () => {
    // Mock the useSelector hook to return a sample member
    const mockedMember = {
      firstName: 'John',
      avios: 100,
    };
    require('@/store/hooks').useAppSelector.mockReturnValue(mockedMember);

    const { getByTestId, getByText } = render(<Home onPress={() => { }} />);

    expect(getByText('Welcome back')).toBeTruthy();
    // expect(getByText('John  MaterialCommunityIcons')).toBeTruthy(); // Adjust as needed

    const balanceText = getByText('Balance 100');
    expect(balanceText).toBeTruthy();

    // Trigger onPress using fireEvent
    fireEvent.press(getByTestId('TouchPress'));
  });

  it('has TouchableOpacity with testID "TouchPress"', () => {
    const { getByTestId } = render(<Home onPress={() => { }} />);
    expect(getByTestId('TouchPress')).toBeTruthy();
  });

  it('has correct styles applied', () => {
    const { getByTestId } = render(<Home onPress={() => { }} />);
    const touchableOpacity = getByTestId('TouchPress');

    expect(touchableOpacity).toHaveStyle(styles.barcomponent);
  });
});
