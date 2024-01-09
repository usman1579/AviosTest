import {api} from './api';
import {Category} from '@/mock-api/models';

export const categoryApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query<Category[], void>({
      query: () => ({url: 'category'}),
      providesTags: result =>
        result
          ? [...result.map(({id}) => ({type: 'Category' as const, id}))]
          : [{type: 'Category', id: 'List'}],
    }),
    getCategory: build.query<Category, string>({
      query: id => ({url: `category/${id}`}),
      providesTags: (_result, _err, id) => [{type: 'Category', id}],
    }),
  }),
  overrideExisting: true,
});

export const {useGetCategoriesQuery, useGetCategoryQuery} = categoryApi;
