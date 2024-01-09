import React, {useCallback, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {selectSignUpState, resetSignUpState} from '@/slices/auth';
import {memberApi} from '@/services/member';
import {StackScreenProp, MAIN_ROUTES} from '@/navigation/types';
import {SignUp} from '@/components/signup/SignUp';

export function SignUpScreen({navigation}: StackScreenProp<typeof MAIN_ROUTES.SIGN_UP>) {
  const dispatch = useAppDispatch();
  const signUpState = useAppSelector(selectSignUpState);

  const handleSignUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const signUp = memberApi.endpoints.signup.initiate({
      firstName,
      lastName,
      email,
      password,
      avios: 0,
    });

    await dispatch(signUp);
  };

  const handleSignIn = useCallback(() => navigation.navigate(MAIN_ROUTES.SIGN_IN), [navigation]);

  useEffect(() => {
    if (signUpState === 'success') {
      dispatch(resetSignUpState());
      handleSignIn();
    }
  }, [handleSignIn, signUpState, dispatch]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.root}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SignUp signIn={handleSignIn} signUp={handleSignUp} />
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
