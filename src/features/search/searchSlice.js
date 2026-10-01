import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  guests: 1,
  checkIn: null,
  checkOut: null,
};

const searchSlice = createSlice({
  name: "search",
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
    applySearch: (state) => {
      state.appliedGuests = state.guests;
    },
  },
});

export const { setCity, setGuests, setCheckIn, setCheckOut, applySearch } = searchSlice.actions;
export default searchSlice.reducer;
