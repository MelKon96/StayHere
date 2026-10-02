import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBookingCheckIn, setBookingCheckOut, setRooms, addBooking, clearBooking } from "../../features/booking/bookingSlice";
import { translations } from "../../constants/translations";
import { convertPrice, getCurrencySymbol } from "../../utils/currency";

import styles from "./Booking.module.css";

const Booking = () => {
  const booking = useSelector((state) => state.booking.current);
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  const dispatch = useDispatch();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleConfirm = () => {
    setConfirmedBooking(booking);

    dispatch(addBooking());
    dispatch(clearBooking());

    setIsConfirmed(true);
  };

  if (!isConfirmed && (!booking.hotel || !booking.room)) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>{text.booking.notSelected}</h1>
        </div>
      </main>
    );
  }

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const difference = new Date(checkOut) - new Date(checkIn);

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(booking.checkIn, booking.checkOut);

  const totalPrice = booking.room?.pricePerNight * nights * booking.rooms;

  const confirmedNights = confirmedBooking ? calculateNights(confirmedBooking.checkIn, confirmedBooking.checkOut) : 0;

  const confirmedTotalPrice = confirmedBooking ? confirmedBooking.room.pricePerNight * confirmedNights * confirmedBooking.rooms : 0;

  const displayedTotalPrice = convertPrice(totalPrice, currency);
  const displayedConfirmedTotalPrice = convertPrice(confirmedTotalPrice, currency);

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {isConfirmed && (
          <section className={styles.confirmation}>
            <div className={styles.confirmationIcon}>✓</div>

            <h1>{text.booking.confirmed}</h1>

            <p className={styles.confirmationMessage}>{text.booking.successMessage}</p>

            <div className={styles.confirmationDetails}>
              <div className={styles.confirmationDetail}>
                <span>{text.booking.hotel}</span>
                <strong>{confirmedBooking.hotel.name}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>{text.booking.room}</span>
                <strong>{confirmedBooking.room.name}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>{text.booking.checkIn}</span>
                <strong>{confirmedBooking.checkIn}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>{text.booking.checkOut}</span>
                <strong>{confirmedBooking.checkOut}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>{text.booking.rooms}</span>
                <strong>{confirmedBooking.rooms}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>{text.booking.guests}</span>
                <strong>{confirmedBooking.guests}</strong>
              </div>
            </div>

            <div className={styles.confirmationTotal}>
              <span>{text.booking.total}</span>

              <strong>
                {displayedConfirmedTotalPrice.toFixed(2)} {currencySymbol}
              </strong>
            </div>
          </section>
        )}

        {!isConfirmed && (
          <>
            <h1 className={styles.title}>{text.booking.title}</h1>

            <section className={styles.hotel}>
              <img src={booking.hotel.images[0]} alt={booking.hotel.name} className={styles.image} />

              <div className={styles.hotelInfo}>
                <h2>{booking.hotel.name}</h2>
                <p>{booking.hotel.location}</p>
              </div>
            </section>

            <section className={styles.roomsCount}>
              <span>{text.booking.rooms}</span>

              <div className={styles.roomsControls}>
                <button type="button" onClick={() => dispatch(setRooms(booking.rooms - 1))} disabled={booking.rooms === 1}>
                  −
                </button>

                <span>{booking.rooms}</span>

                <button type="button" onClick={() => dispatch(setRooms(booking.rooms + 1))} disabled={booking.rooms === booking.room.quantity}>
                  +
                </button>
              </div>
            </section>

            <section className={styles.dates}>
              <div>
                <span>{text.booking.checkIn}</span>

                <input type="date" value={booking.checkIn || ""} onChange={(event) => dispatch(setBookingCheckIn(event.target.value))} />
              </div>

              {booking.checkIn && (
                <div>
                  <span>{text.booking.checkOut}</span>

                  <input type="date" value={booking.checkOut || ""} min={new Date(new Date(booking.checkIn).getTime() + 86400000).toISOString().split("T")[0]} onChange={(event) => dispatch(setBookingCheckOut(event.target.value))} />
                </div>
              )}
            </section>

            <section className={styles.summary}>
              <div>
                <span>{text.booking.guests}</span>
                <strong>{booking.guests}</strong>
              </div>

              <div>
                <span>{text.booking.nights}</span>
                <strong>{nights}</strong>
              </div>

              <div>
                <span>{text.booking.price}</span>

                <strong>
                  {displayedTotalPrice.toFixed(2)} {currencySymbol}
                </strong>
              </div>

              <button type="button" className={styles.confirmButton} onClick={handleConfirm} disabled={!booking.checkIn || !booking.checkOut}>
                {text.booking.confirm}
              </button>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Booking;
