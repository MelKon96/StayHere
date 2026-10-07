const exchangeRates = {
  EUR: 1,
  USD: 1.17,
};

export const convertPrice = (price, currency) => {
  return price * exchangeRates[currency];
};

export const getCurrencySymbol = (currency) => {
  return currency === 'USD' ? '$' : '€';
};
