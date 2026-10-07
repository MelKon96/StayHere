import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minPrice: '',
  maxPrice: '',
  categories: [],
  minRooms: '',
  maxRooms: '',
  amenities: [],
};

const hotelFiltersSlice = createSlice({
  name: 'hotelFilters',
  initialState,
  reducers: {
    setHotelFilters: (state, action) => action.payload,
    resetHotelFilters: () => initialState,
  },
});

export const { setHotelFilters, resetHotelFilters } = hotelFiltersSlice.actions;
export default hotelFiltersSlice.reducer;
