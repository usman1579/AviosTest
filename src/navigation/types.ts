import type {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {StackScreenProps} from '@react-navigation/stack';
// import type {DrawerNavigationProp} from '@react-navigation/drawer';

export const MAIN_ROUTES = {
  MAIN: 'Main',
  HOME: 'Home',
  SPEND: 'Spend',
  COLLECT: 'Collect',
  ACCOUNT: 'Account',
  SPLASH: 'Splash',
  APP_LOADING: 'AppLoading',
  SIGN_IN: 'SignIn',
  SIGN_UP: 'SignUp',
} as const;

export type DrawerParamList = {
  [MAIN_ROUTES.HOME]: undefined;
};

export type TabStackParamList = {
  [MAIN_ROUTES.HOME]: undefined;
  [MAIN_ROUTES.SPEND]: undefined;
  [MAIN_ROUTES.COLLECT]: undefined;
  [MAIN_ROUTES.ACCOUNT]: undefined;
};

export type StackParamList = {
  [MAIN_ROUTES.MAIN]: NavigatorScreenParams<TabStackParamList> | undefined;
  [MAIN_ROUTES.SPLASH]: undefined;
  [MAIN_ROUTES.APP_LOADING]: undefined;
  [MAIN_ROUTES.SIGN_IN]: undefined;
  [MAIN_ROUTES.SIGN_UP]: undefined;
};

export type StackScreenProp<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>;

export type TabScreenProp<T extends keyof TabStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, T>,
  StackScreenProp<keyof StackParamList>
>;

// export type GlobalScreenProp = CompositeScreenProps<>

// export type GlobalNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<TabStackParamList>,
//   CompositeNavigationProp<
//     StackNavigationProp<StackParamList>,
//     DrawerNavigationProp<DrawerParamList>
//   >
// >;
