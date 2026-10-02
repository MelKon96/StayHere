import { useSelector } from "react-redux";

import { translations } from "../../constants/translations";

import styles from "./MyBookings.module.css";

const MyBookings = () => {
  const bookings = useSelector((state) => state.booking.bookings);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  if (bookings.length === 0) {
    return (
      <div className={styles.myBookings}>
        <h1>{text.myBookings.title}</h1>
        <p>{text.myBookings.empty}</p>
      </div>
    );
  }

  return (
    <div className={styles.myBookings}>
      <h1>{text.myBookings.title}</h1>

      <ul className={styles.bookingsList}>
        {bookings.map((booking) => (
          <li key={booking.id} className={styles.bookingCard}>
            <div className={styles.bookingHeader}>
              <h2>{booking.hotel.name}</h2>

              <span className={styles.bookingStatus}>{text.myBookings.status}</span>
            </div>

            <div className={styles.bookingDetails}>
              <div className={styles.detail}>
                <span className={styles.label}>{text.myBookings.room}</span>

                <span className={styles.value}>{booking.room.name}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>{text.myBookings.checkIn}</span>

                <span className={styles.value}>{booking.checkIn}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>{text.myBookings.checkOut}</span>

                <span className={styles.value}>{booking.checkOut}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>{text.myBookings.guests}</span>

                <span className={styles.value}>{booking.guests}</span>
              </div>

              <div className={styles.detail}>
                <span className={styles.label}>{text.myBookings.rooms}</span>

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
