import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setBookingCheckIn,
  setBookingCheckOut,
  setRooms,
  addBooking,
  clearBooking,
} from '../../helpers/store/slices/booking/bookingSlice';
import { translations } from '../../constants/translations';
import { convertPriceWithSymbol } from '../../utils/currency';
import { calculateNights, addDays, getTodayISO } from '../../utils/date';

import styles from './Booking.module.css';

const Booking = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking.current);
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);
  const text = translations[language];
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

  const nights = calculateNights(booking.checkIn, booking.checkOut);

  const totalPrice =
    (booking.room?.pricePerNight || 0) * nights * booking.rooms;

  const confirmedNights = confirmedBooking
    ? calculateNights(confirmedBooking.checkIn, confirmedBooking.checkOut)
    : 0;

  const confirmedTotalPrice = confirmedBooking
    ? confirmedBooking.room.pricePerNight *
      confirmedNights *
      confirmedBooking.rooms
    : 0;

  const displayedTotalPrice = convertPriceWithSymbol(totalPrice, currency);

  const displayedConfirmedTotalPrice = convertPriceWithSymbol(
    confirmedTotalPrice,
    currency,
  );

  const todayISO = getTodayISO();
  const minCheckOutDate = booking.checkIn ? addDays(booking.checkIn, 1) : '';

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {isConfirmed && (
          <section className={styles.confirmation}>
            <div className={styles.confirmationIcon}>✓</div>

            <h1>{text.booking.confirmed}</h1>

            <p className={styles.confirmationMessage}>
              {text.booking.successMessage}
            </p>

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

              <strong>{displayedConfirmedTotalPrice}</strong>
            </div>
          </section>
        )}

        {!isConfirmed && (
          <>
            <h1 className={styles.title}>{text.booking.title}</h1>

            <section className={styles.hotel}>
              <img
                src={booking.hotel.images[0]}
                alt={booking.hotel.name}
                className={styles.image}
              />

              <div className={styles.hotelInfo}>
                <h2>{booking.hotel.name}</h2>
                <p>{booking.hotel.location}</p>
              </div>
            </section>

            <section className={styles.roomsCount}>
              <span>{text.booking.rooms}</span>

              <div className={styles.roomsControls}>
                <button
                  type="button"
                  onClick={() => dispatch(setRooms(booking.rooms - 1))}
                  disabled={booking.rooms === 1}
                >
                  −
                </button>

                <span>{booking.rooms}</span>

                <button
                  type="button"
                  onClick={() => dispatch(setRooms(booking.rooms + 1))}
                  disabled={booking.rooms === booking.room.quantity}
                >
                  +
                </button>
              </div>
            </section>

            <section className={styles.dates}>
              <div>
                <span>{text.booking.checkIn}</span>

                <input
                  type="date"
                  onKeyDown={(e) => e.preventDefault()}
                  value={booking.checkIn || ''}
                  min={todayISO}
                  onChange={(event) =>
                    dispatch(setBookingCheckIn(event.target.value))
                  }
                />
              </div>

              {booking.checkIn && (
                <div>
                  <span>{text.booking.checkOut}</span>

                  <input
                    type="date"
                    onKeyDown={(e) => e.preventDefault()}
                    value={booking.checkOut || ''}
                    min={minCheckOutDate}
                    onChange={(event) =>
                      dispatch(setBookingCheckOut(event.target.value))
                    }
                  />
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

                <strong>{displayedTotalPrice}</strong>
              </div>

              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleConfirm}
                disabled={!booking.checkIn || !booking.checkOut}
              >
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
