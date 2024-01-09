import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from '@/navigation/DrawerNavigator';
import {store} from '@/store/store';
import {startServer} from '@/mock-api/server';

if (process.env.NODE_ENV === 'development') {
  startServer();
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.gesture}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gesture: {
    flex: 1,
  },
});

export default App;
