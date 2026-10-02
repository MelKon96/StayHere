import { createSlice } from "@reduxjs/toolkit";

const savedCurrency = localStorage.getItem("stayhere_currency");
const savedLanguage = localStorage.getItem("stayhere_language");

const initialState = {
  language: savedLanguage === "en" ? "en" : "ru",
  currency: savedCurrency === "USD" ? "USD" : "EUR",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setLanguage, setCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;
