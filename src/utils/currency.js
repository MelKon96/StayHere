import { CURRENCIES } from '../constants/currencies.js';

export const convertPrice = (price, currency) => {
  const currencyData = CURRENCIES.find((item) => item.code === currency);

  return price * currencyData.rate;
};

export const getCurrencySymbol = (currency) => {
  const currencyData = CURRENCIES.find((item) => item.code === currency);

  return currencyData.symbol;
};
