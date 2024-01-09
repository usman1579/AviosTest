import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IAccontInfo {
  headline: string;
  value: any;
}

export const AccontInfo = ({ headline, value }: IAccontInfo) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  value: {
    fontWeight: '500',
    fontSize: 16,
    color: 'grey',
    marginLeft: 20,
    margin: 5,
  },
});
