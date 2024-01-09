import {configureStore, combineReducers, ConfigureStoreOptions} from '@reduxjs/toolkit';

import auth from '@/slices/auth';
import {api} from '@/services/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
});

export const createStore = (
  preloadedState?: ConfigureStoreOptions<RootState>['preloadedState'] | undefined,
) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  });

export const store = createStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = typeof store.dispatch;
