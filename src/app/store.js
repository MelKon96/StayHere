import { configureStore } from '@reduxjs/toolkit';
import { hotelApi } from '../services/hotelApi.js';
import searchReducer from '../features/search/searchSlice.js';
import bookingReducer from '../features/booking/bookingSlice.js';
import settingsReducer from '../features/settings/settingsSlice.js';
import hotelFiltersReducer from '../features/hotelFilters/hotelFiltersSlice.js';

export default configureStore({
  reducer: {
    search: searchReducer,
    booking: bookingReducer,
    settings: settingsReducer,
    hotelFilters: hotelFiltersReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hotelApi.middleware),
});
