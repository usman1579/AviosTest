import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  prepareHeaders: (headers, {getState}) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authentication', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Offer', 'Member', 'Category', 'Favourite'],
  endpoints: () => ({}),
});
