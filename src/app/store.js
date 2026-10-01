import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "../services/hotelApi.js";
import searchReducer from "../features/search/searchSlice.js";
import bookingReducer from "../features/booking/bookingSlice.js";

export default configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hotelApi.middleware),
});
