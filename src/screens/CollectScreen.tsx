import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function CollectScreen() {
  return (
    <View style={styles.root}>
      <Text>COLLECT</Text>
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
