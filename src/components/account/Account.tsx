import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { selectMember } from '@/slices/auth';
import { AccontInfo } from './component';

export function Account() {
  const member = useAppSelector(selectMember);

  return (
    <View style={styles.container}>
      <AccontInfo headline={'FirstName'} value={member?.firstName} />
      <AccontInfo headline={'LastName'} value={member?.lastName} />
      <AccontInfo headline={'Email'} value={member?.email} />
      <AccontInfo headline={'Avious Points'} value={member?.avios} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
