import styles from "./MyBookings.module.css";

import { useSelector } from "react-redux";

const MyBookings = () => {
  const bookings = useSelector((state) => state.booking.bookings);

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

      <ul className={styles.bookingsList}>
        {bookings.map((booking) => (
          <li key={booking.id} className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <h2>{booking.hotel.name}</h2>
              <span className={styles.bookingStatus}>Забронировано</span>
            </div>

            <div className={styles.bookingDetails}>
              <div className={styles.detail}>
                <span className={styles.label}>Номер</span>
                <span className={styles.value}>{booking.room.name}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>Заезд</span>
                <span className={styles.value}>{booking.checkIn}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>Выезд</span>
                <span className={styles.value}>{booking.checkOut}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>Гости</span>
                <span className={styles.value}>{booking.guests}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>Номеров</span>
                <span className={styles.value}>{booking.rooms}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
