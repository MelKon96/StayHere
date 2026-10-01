import { useParams } from "react-router-dom";
import { useGetHotelsQuery } from "../../services/hotelApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./HotelDetails.module.css";
import { setBooking } from "../../features/booking/bookingSlice";

const HotelDetails = () => {
  const { id } = useParams();

  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { guests, checkIn, checkOut } = useSelector((state) => state.search);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки данных</p>;
  }

  const hotel = hotels.find((hotel) => hotel.id === +(id));

  if (!hotel) {
    return <p>Отель не найден</p>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <img src={hotel.images[0]} alt={hotel.name} className={styles.image} />

        <div className={styles.info}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{hotel.name}</h1>
              <p className={styles.location}>{hotel.location}</p>
            </div>
            <span className={styles.category}>★ {hotel.category}</span>
          </div>

          <p className={styles.description}>{hotel.description}</p>
          <div className={styles.amenities}>
            <h2>Удобства</h2>

            <div className={styles.amenitiesList}>
              {hotel.amenities.wifi && <span>Wi-Fi</span>}
              {hotel.amenities.airConditioning && <span>Кондиционер</span>}
              {hotel.amenities.pool && <span>Бассейн</span>}
              {hotel.amenities.parking && <span>Парковка</span>}
            </div>
          </div>
          <section className={styles.rooms}>
            <h2>Номера</h2>

            <div className={styles.roomsList}>
              {hotel.roomTypes.map((room) => (
                <article key={room.type} className={styles.room}>
                  <div>
                    <h3>{room.name}</h3>
                    <p>До {room.capacity} гостей</p>
                    <p>{room.beds}</p>
                  </div>

                  <div className={styles.roomInfo}>
                    <span className={styles.price}>{room.pricePerNight} € / ночь</span>

                    <span className={styles.quantity}>{room.quantity} номеров</span>

                    <button
                      type="button"
                      onClick={() => {
                        dispatch(
                          setBooking({
                            hotel,
                            room,
                            guests,
                            checkIn,
                            checkOut,
                          }),
                        );

                        navigate("/booking");
                      }}
                    >
                      Забронировать
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HotelDetails;
