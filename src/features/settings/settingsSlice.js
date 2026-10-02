import { createSlice } from "@reduxjs/toolkit";

const savedCurrency = localStorage.getItem("stayhere_currency");

const initialState = {
  lang: "ru",
  currency: savedCurrency === "USD" ? "USD" : "EUR",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setLang, setCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;
