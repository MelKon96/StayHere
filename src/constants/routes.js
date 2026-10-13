const HOTELS = '/hotels';

export const ROUTES = {
  HOME: '/',
  HOTELS,
  HOTEL: `${HOTELS}/:id`,
  BOOKING: '/booking',
  MY_BOOKINGS: '/my-bookings',
  NOT_FOUND: '*',
};

export const getHotelPath = (id) => `${HOTELS}/${id}`;