import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),

  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => '/c/e5b6-e719-4188-b332',
    }),
    getHotel: builder.query({
      query: (id) => `/c/e5b6-e719-4188-b332/${id}`,
    }),
  }),
});

export const { useGetHotelsQuery, useGetHotelQuery } = hotelApi;
