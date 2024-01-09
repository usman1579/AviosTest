import {api} from './api';
import {Offer} from '@/mock-api/models';

export const offerApi = api.injectEndpoints({
  endpoints: build => ({
    getOffers: build.query<Offer[], void>({
      query: () => ({url: 'offer'}),
      providesTags: result =>
        result
          ? [...result.map(({id}) => ({type: 'Offer' as const, id}))]
          : [{type: 'Offer', id: 'List'}],
    }),
    getOffer: build.query<Offer, string>({
      query: id => ({url: `offer/${id}`}),
      providesTags: (_result, _err, id) => [{type: 'Offer', id}],
    }),
    getOfferSearch: build.query<Offer[], Record<string, string | number | boolean>>({
      query: params => ({url: 'offer/search', params}),
    }),
  }),
  overrideExisting: true,
});

export const {useGetOffersQuery, useGetOfferQuery, useGetOfferSearchQuery} = offerApi;
