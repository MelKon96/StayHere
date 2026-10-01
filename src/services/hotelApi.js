import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),

  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "/c/5f42-11a0-4f1c-b967",
    }),
    getHotel: builder.query({
      query: (id) => `/c/5f42-11a0-4f1c-b967/${id}`,
    }),
  }),
});

export const { useGetHotelsQuery, useGetHotelQuery } = hotelApi;
