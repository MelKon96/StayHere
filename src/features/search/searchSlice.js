import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: '',
  guests: 1,
  checkIn: null,
  checkOut: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },

    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    resetSearch: (state) => {
      state.city = '';
      state.guests = 1;
      state.checkIn = null;
      state.checkOut = null;
    },
  },
});

export const { setCity, setGuests, setCheckIn, setCheckOut, resetSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
