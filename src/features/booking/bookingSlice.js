import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {
    hotel: null,
    room: null,
    guests: 1,
    rooms: 1,
    checkIn: null,
    checkOut: null,
  },
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.current.hotel = action.payload.hotel;
      state.current.room = action.payload.room;
      state.current.guests = action.payload.guests;
      state.current.rooms = 1;
      state.current.checkIn = action.payload.checkIn;
      state.current.checkOut = action.payload.checkOut;
    },

    setBookingCheckIn: (state, action) => {
      state.current.checkIn = action.payload;
    },

    setBookingCheckOut: (state, action) => {
      state.current.checkOut = action.payload;
    },

    setRooms: (state, action) => {
      state.current.rooms = action.payload;
    },

    addBooking: (state) => {
      state.bookings.push({
        id: Date.now(),
        ...state.current,
      });
    },

    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload,
      );
    },

    clearBooking: (state) => {
      state.current = {
        hotel: null,
        room: null,
        guests: 1,
        rooms: 1,
        checkIn: null,
        checkOut: null,
      };
    },
  },
});

export const {
  setBooking,
  setBookingCheckIn,
  setBookingCheckOut,
  setRooms,
  addBooking,
  removeBooking,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
