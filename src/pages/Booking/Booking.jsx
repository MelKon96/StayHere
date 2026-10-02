import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBookingCheckIn, setBookingCheckOut, setRooms, addBooking, clearBooking } from "../../features/booking/bookingSlice";
import { convertPrice, getCurrencySymbol } from "../../utils/currency";

import styles from "./Booking.module.css";

const Booking = () => {
  const booking = useSelector((state) => state.booking.current);
  const currency = useSelector((state) => state.settings.currency);

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
          <h1>Бронирование не выбрано</h1>
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

            <h1>Бронирование подтверждено</h1>

            <p className={styles.confirmationMessage}>Ваше бронирование успешно оформлено.</p>

            <div className={styles.confirmationDetails}>
              <div className={styles.confirmationDetail}>
                <span>Отель</span>
                <strong>{confirmedBooking.hotel.name}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>Номер</span>
                <strong>{confirmedBooking.room.name}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>Заезд</span>
                <strong>{confirmedBooking.checkIn}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>Выезд</span>
                <strong>{confirmedBooking.checkOut}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>Номеров</span>
                <strong>{confirmedBooking.rooms}</strong>
              </div>

              <div className={styles.confirmationDetail}>
                <span>Гостей</span>
                <strong>{confirmedBooking.guests}</strong>
              </div>
            </div>

            <div className={styles.confirmationTotal}>
              <span>Итоговая стоимость</span>
              <strong>
                {displayedConfirmedTotalPrice.toFixed(2)} {currencySymbol}
              </strong>
            </div>
          </section>
        )}

        {!isConfirmed && (
          <>
            <h1 className={styles.title}>Бронирование</h1>

            <section className={styles.hotel}>
              <img src={booking.hotel.images[0]} alt={booking.hotel.name} className={styles.image} />

              <div className={styles.hotelInfo}>
                <h2>{booking.hotel.name}</h2>
                <p>{booking.hotel.location}</p>
              </div>
            </section>

            <section className={styles.roomsCount}>
              <span>Номеров</span>

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
                <span>Заезд</span>

                <input type="date" value={booking.checkIn || ""} onChange={(event) => dispatch(setBookingCheckIn(event.target.value))} />
              </div>

              {booking.checkIn && (
                <div>
                  <span>Выезд</span>

                  <input type="date" value={booking.checkOut || ""} min={new Date(new Date(booking.checkIn).getTime() + 86400000).toISOString().split("T")[0]} onChange={(event) => dispatch(setBookingCheckOut(event.target.value))} />
                </div>
              )}
            </section>

            <section className={styles.summary}>
              <div>
                <span>Гостей</span>
                <strong>{booking.guests}</strong>
              </div>

              <div>
                <span>Ночей</span>
                <strong>{nights}</strong>
              </div>

              <div>
                <span>Стоимость</span>
                <strong>
                  {displayedTotalPrice.toFixed(2)} {currencySymbol}
                </strong>
              </div>

              <button type="button" className={styles.confirmButton} onClick={handleConfirm} disabled={!booking.checkIn || !booking.checkOut}>
                Подтвердить бронирование
              </button>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Booking;
