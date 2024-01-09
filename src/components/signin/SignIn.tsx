import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {useAppSelector} from '@/store/hooks';
import {selectAuthState} from '@/slices/auth';

type Props = {
  signIn: (email: string, password: string) => void;
  signUp: () => void;
};

export function SignIn({signIn, signUp}: Props) {
  const authState = useAppSelector(selectAuthState);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isDisabled = useMemo(
    () => !email || !password || authState === 'pending',
    [email, password, authState],
  );

  const signInError = useMemo(() => authState === 'rejected', [authState]);

  return (
    <View style={styles.root}>
      <Text style={styles.header}>Sign In</Text>
      <TextInput
        autoComplete="email"
        inputMode="email"
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={value => setEmail(value)}
        defaultValue={email}
        style={[styles.textInput, signInError && styles.textInputError]}
      />
      <TextInput
        autoComplete="off"
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
        defaultValue={password}
        style={[styles.textInput, signInError && styles.textInputError]}
      />
      <View style={styles.btnContainer}>
        <Button title="Sign In" onPress={() => signIn(email, password)} disabled={isDisabled} />
        <Button title="Sign Up" onPress={signUp} />
      </View>
      {signInError && <Text style={styles.errorMessage}>Sign in credentials incorrect</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 36,
    marginVertical: 48,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  textInputError: {
    borderColor: '#B20000',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    marginTop: 12,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#B20000',
  },
});
