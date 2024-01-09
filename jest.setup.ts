import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// @ts-ignore
global.self = global;
// @ts-ignore
global.window = global;
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;
  return {KeyboardAwareScrollView};
});
