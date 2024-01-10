import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectMember } from '@/slices/auth';
import { MAIN_ROUTES } from '@/navigation/types';

const WELCOMEBACK = 'Welcome back';
const BALANCE = 'Balance';

export function Home({ navigation }: any) {
  const member = useAppSelector(selectMember);
  const onPress = () => navigation.navigate(MAIN_ROUTES.ACCOUNT);

  return (
    <View style={styles.root}>
      <Text style={styles.welcome}>{WELCOMEBACK}</Text>
      <Text style={styles.firstName}>
        {member?.firstName + '  '}
        <MaterialCommunityIcons name="hand-wave-outline" size={24} />
      </Text>

      <TouchableOpacity testID={'TouchPress'} onPress={onPress} style={styles.barcomponent}>
        <View style={styles.view1}>
          <Ionicons name="cube-outline" size={24} color={'black'} />
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>
            {BALANCE} <Text style={styles.balance}>{member?.avios}</Text>
          </Text>
        </View>
        <View style={styles.view3}>
          <Ionicons name="chevron-forward" size={24} color={'blue'} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  welcome: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  firstName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  barcomponent: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  view1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    flex: 4,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  view3: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
