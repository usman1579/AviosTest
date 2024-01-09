import {api} from './api';
import type {Member} from '@/mock-api/models';

export const memberApi = api.injectEndpoints({
  endpoints: build => ({
    signin: build.mutation<
      {token: string; member: Omit<Member, 'password'>},
      Pick<Member, 'email' | 'password'>
    >({
      query: body => ({
        url: 'member/signin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Member', 'Favourite'],
    }),
    signup: build.mutation<
      {token: string; member: Omit<Member, 'password'>},
      Omit<Member, 'id' | 'favourites'>
    >({
      query: body => ({
        url: 'member/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Member', 'Favourite'],
    }),
    getMember: build.query<Member, string>({
      query: id => `member/${id}`,
      providesTags: (_member, _err, id) => [{type: 'Member', id}],
    }),
  }),
  overrideExisting: true,
});

export const {useSigninMutation, useSignupMutation, useGetMemberQuery} = memberApi;
