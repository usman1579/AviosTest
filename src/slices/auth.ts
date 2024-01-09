import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@/store/store';
import type {Member} from '@/mock-api/models';
import {memberApi} from '@/services/member';

type Auth = {
  member: null | Omit<Member, 'password'>;
  token: string | null;
  isAuthenticated: boolean;
  authState: 'init' | 'pending' | 'rejected' | 'success';
  signUpState: 'init' | 'pending' | 'rejected' | 'success';
};

const initialState: Auth = {
  member: null,
  token: null,
  isAuthenticated: false,
  authState: 'init',
  signUpState: 'init',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: () => initialState,
    resetSignUpState: state => {
      state.signUpState = 'init';
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(memberApi.endpoints.signin.matchPending, state => {
        state.authState = 'pending';
      })
      .addMatcher(
        memberApi.endpoints.signin.matchFulfilled,
        (state, action: PayloadAction<{token: string; member: Omit<Member, 'password'>}>) => {
          state.member = action.payload.member;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.authState = 'success';
        },
      )
      .addMatcher(memberApi.endpoints.signin.matchRejected, state => {
        state.authState = 'rejected';
      })
      .addMatcher(memberApi.endpoints.signup.matchPending, state => {
        state.signUpState = 'pending';
      })
      .addMatcher(memberApi.endpoints.signup.matchFulfilled, state => {
        state.signUpState = 'success';
      })
      .addMatcher(memberApi.endpoints.signup.matchRejected, state => {
        state.signUpState = 'rejected';
      });
  },
});

export const {signout, resetSignUpState} = slice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthState = (state: RootState) => state.auth.authState;
export const selectSignUpState = (state: RootState) => state.auth.signUpState;
export const selectMember = (state: RootState) => state.auth.member;

export default slice.reducer;
