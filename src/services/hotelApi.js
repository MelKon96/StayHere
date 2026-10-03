import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "/c/2f49-f2ba-472a-b3a7",
    }),
    getHotel: builder.query({
      query: (id) => `/c/2f49-f2ba-472a-b3a7/${id}`,
    }),
  }),
});

export const { useGetHotelsQuery, useGetHotelQuery } = hotelApi;
