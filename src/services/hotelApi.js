import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "/c6b7-453b-4dc9-a3aa",
    }),
    getHotel: builder.query({
      query: (id) => `/c6b7-453b-4dc9-a3aa/${id}`,
    }),
  }),
});

export const { useGetHotelsQuery, useGetHotelQuery } = hotelApi;
