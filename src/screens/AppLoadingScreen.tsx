import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackScreenProp, MAIN_ROUTES} from '@/navigation/types';

export function AppLoadingScreen({navigation}: StackScreenProp<typeof MAIN_ROUTES.APP_LOADING>) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(MAIN_ROUTES.MAIN);
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Text>Loading...</Text>
    </View>
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
});
