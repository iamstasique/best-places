import { configureStore } from '@reduxjs/toolkit';
import { pointsApi } from '../api/points.api';

export const STORE = configureStore({
  reducer: {
    [pointsApi.reducerPath]: pointsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([pointsApi.middleware]),
});
