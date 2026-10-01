import styles from "./MyBookings.module.css";

import { useSelector } from "react-redux";

const MyBookings = () => {
  const bookings = useSelector((state) => state.booking.bookings);

  console.log(bookings);

  if (bookings.length === 0) {
    return (
      <div className={styles.myBookings}>
        <h1>Мои бронирования</h1>
        <p>У вас пока нет бронирований.</p>
      </div>
    );
  }

  return (
    <div className={styles.myBookings}>
      <h1>Мои бронирования</h1>

      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <h2>{booking.hotel.name}</h2>

            <p>Номер: {booking.room.name}</p>

            <p>Дата заезда: {booking.checkIn}</p>

            <p>Дата выезда: {booking.checkOut}</p>

            <p>Гостей: {booking.guests}</p>

            <p>Номеров: {booking.rooms}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
