import {api} from './api';
import {Offer} from '@/mock-api/models';

export const favouriteApi = api.injectEndpoints({
  endpoints: build => ({
    getFavourites: build.query<Offer[], string>({
      query: memberId => ({url: `favourite/${memberId}`}),
      providesTags: result =>
        result
          ? [...result.map(({id}) => ({type: 'Favourite' as const, id}))]
          : [{type: 'Favourite', id: 'List'}],
    }),
  }),
  overrideExisting: true,
});

export const {useGetFavouritesQuery} = favouriteApi;
