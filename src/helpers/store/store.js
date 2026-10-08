import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { hotelApi } from '../../services/hotelApi.js';

import searchReducer from './slices/search/searchSlice.js';
import bookingReducer from './slices/booking/bookingSlice.js';
import settingsReducer from './slices/settings/settingsSlice.js';
import hotelFiltersReducer from './slices/hotelFilters/hotelFiltersSlice.js';

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),

  setItem: (key, value) => {
    localStorage.setItem(key, value);

    return Promise.resolve();
  },

  removeItem: (key) => {
    localStorage.removeItem(key);

    return Promise.resolve();
  },
};

const settingsPersistConfig = {
  key: 'settings',
  storage,
};

const bookingPersistConfig = {
  key: 'booking',
  storage,
  whitelist: ['bookings'],
};

const persistedSettingsReducer = persistReducer(
  settingsPersistConfig,
  settingsReducer,
);

const persistedBookingReducer = persistReducer(
  bookingPersistConfig,
  bookingReducer,
);

export const store = configureStore({
  reducer: {
    search: searchReducer,
    booking: persistedBookingReducer,
    settings: persistedSettingsReducer,
    hotelFilters: hotelFiltersReducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
        ],
      },
    }).concat(hotelApi.middleware),
});

export const persistor = persistStore(store);
