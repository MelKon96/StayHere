const pad = (number) => String(number).padStart(2, '0');

export const toISO = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromISO = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);

  return new Date(year, month - 1, day);
};

export const addDays = (iso, days) => {
  const date = fromISO(iso);
  date.setDate(date.getDate() + days);

  return toISO(date);
};

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) {
    return 0;
  }

  return Math.round(
    (fromISO(checkOut) - fromISO(checkIn)) / (1000 * 60 * 60 * 24),
  );
};

export const startOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const addMonths = (date, months) =>
  new Date(date.getFullYear(), date.getMonth() + months, 1);

export const today = () => {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const getTodayISO = () => toISO(today());
