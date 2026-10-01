import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setBookingCheckIn, setBookingCheckOut, setRooms, addBooking, clearBooking } from "../../features/booking/bookingSlice";

import styles from "./Booking.module.css";

const Booking = () => {
  const booking = useSelector((state) => state.booking.current);

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

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {isConfirmed && (
          <section>
            <h1>Бронирование подтверждено</h1>

            <p>
              {confirmedBooking.hotel.name} — {confirmedBooking.room.name}
            </p>

            <p>
              {confirmedBooking.checkIn} — {confirmedBooking.checkOut}
            </p>

            <p>Номеров: {confirmedBooking.rooms}</p>

            <p>Итоговая стоимость: {confirmedTotalPrice} €</p>
          </section>
        )}

        {!isConfirmed && (
          <>
            <h1>Бронирование</h1>

            <section className={styles.hotel}>
              <img src={booking.hotel.images[0]} alt={booking.hotel.name} className={styles.image} />

              <div>
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
                <strong>{totalPrice} €</strong>
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
