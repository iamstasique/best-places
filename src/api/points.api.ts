import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, Urls } from './urls.enum';
import { BASE_URL } from './urls.constant';
import { MapPoint } from '../types/point-form.type';

export const pointsApi = createApi({
  reducerPath: Urls.Points,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [Urls.Points],
  endpoints: (builder) => ({
    getPoints: builder.query({
      query: () => Urls.Points,
      providesTags: [Urls.Points],
    }),
    getPoint: builder.query({
      query: (id: string) => `${Urls.Points}/${id}`,
      providesTags: [Urls.Points],
    }),
    sendPoint: builder.mutation({
      query: (body: MapPoint) => ({
        url: Urls.Points,
        method: HttpMethods.Post,
        body,
      }),
      invalidatesTags: [Urls.Points],
    }),
  }),
});

export const { useGetPointsQuery, useSendPointMutation } = pointsApi;
