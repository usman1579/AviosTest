import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useAppSelector} from '@/store/hooks';
import {selectIsAuthenticated} from '@/slices/auth';
import {StackScreenProp, MAIN_ROUTES} from '@/navigation/types';

export function SplashScreen({navigation}: StackScreenProp<typeof MAIN_ROUTES.SPLASH>) {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);
  const navigate = useCallback(
    () => navigation.navigate(isLoggedIn ? MAIN_ROUTES.MAIN : MAIN_ROUTES.SIGN_IN),
    [navigation, isLoggedIn],
  );

  return (
    <TouchableWithoutFeedback onPress={() => navigate()}>
      <View style={styles.root}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>IAG Loyalty</Text>
          <Text style={styles.subTitle}>Technical Test App</Text>
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.cta}>Touch Screen to start!</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.smallText}>Written by the IAGL Rewards App Team</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
  },
  titleBox: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  subTitle: {
    fontSize: 20,
  },
  cta: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 12,
  },
  contentBox: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
