import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Hotels from '../pages/Hotels/Hotels';
import HotelDetails from '../pages/HotelDetails/HotelDetails';
import Booking from '../pages/Booking/Booking';
import MyBookings from '../pages/MyBookings/MyBookings';
import NotFound from '../pages/NotFound/NotFound';
import { ROUTES } from '../constants/routes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.HOTELS} element={<Hotels />} />
      <Route path={ROUTES.HOTEL} element={<HotelDetails />} />
      <Route path={ROUTES.BOOKING} element={<Booking />} />
      <Route path={ROUTES.MY_BOOKINGS} element={<MyBookings />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
