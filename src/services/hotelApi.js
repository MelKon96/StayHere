import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),

  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => '/c/cb12-5fbf-452d-8dc3',
    }),
    getHotel: builder.query({
      query: (id) => `/c/cb12-5fbf-452d-8dc3/${id}`,
    }),
  }),
});

export const { useGetHotelsQuery, useGetHotelQuery } = hotelApi;
