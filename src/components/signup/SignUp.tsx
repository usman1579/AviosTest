import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useAppSelector} from '@/store/hooks';
import {selectSignUpState} from '@/slices/auth';

type Props = {
  signUp: (firstName: string, lastName: string, email: string, password: string) => void;
  signIn: () => void;
};

export function SignUp({signIn, signUp}: Props) {
  const signUpState = useAppSelector(selectSignUpState);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isDisabled = useMemo(
    () =>
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      signUpState === 'pending',
    [firstName, lastName, email, password, confirmPassword, signUpState],
  );
  const signInError = useMemo(() => signUpState === 'rejected', [signUpState]);
  const passwordMatchError = useMemo(
    () => password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword,
    [password, confirmPassword],
  );

  return (
    <KeyboardAwareScrollView style={styles.root}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        autoComplete="given-name"
        inputMode="text"
        placeholder="First Name"
        autoCapitalize="words"
        onChangeText={value => setFirstName(value)}
        defaultValue={firstName}
        style={[styles.textInput, signInError && styles.textInputError]}
      />
      <TextInput
        autoComplete="family-name"
        inputMode="text"
        placeholder="Last Name"
        autoCapitalize="words"
        onChangeText={value => setLastName(value)}
        defaultValue={lastName}
        style={[styles.textInput, signInError && styles.textInputError]}
      />
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
      <TextInput
        autoComplete="off"
        placeholder="Confirm Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={value => setConfirmPassword(value)}
        defaultValue={confirmPassword}
        style={[styles.textInput, (signInError || passwordMatchError) && styles.textInputError]}
      />
      <View style={styles.btnContainer}>
        <Button
          title="Sign Up"
          onPress={() => signUp(firstName, lastName, email, password)}
          disabled={isDisabled}
        />
        <Button title="Sign In" onPress={signIn} />
      </View>
      {signInError && <Text style={styles.errorMessage}>Sign up error</Text>}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 24,
    width: '100%',
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
    backgroundColor: 'white',
    marginTop: 12,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#B20000',
  },
});
