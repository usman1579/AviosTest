import React, { useCallback } from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useAppDispatch } from '@/store/hooks';
import { memberApi } from '@/services/member';
import { StackScreenProp, MAIN_ROUTES } from '@/navigation/types';
import { SignIn } from '@/components/signin/SignIn';

export function SignInScreen({ navigation }: StackScreenProp<typeof MAIN_ROUTES.SIGN_IN>) {
  const dispatch = useAppDispatch();

  const handleSignIn = async (email: string, password: string): Promise<void> => {
    const signIn = memberApi.endpoints.signin.initiate({ email, password });
    await dispatch(signIn);
  };

  const handleSignUp = useCallback(() => navigation.navigate(MAIN_ROUTES.SIGN_UP), [navigation]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SignIn signIn={handleSignIn} signUp={handleSignUp} />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
