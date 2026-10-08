import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { translations } from '../../constants/translations';
import { setBooking } from '../../helpers/store/slices/booking/bookingSlice';
import { useGetHotelsQuery } from '../../services/hotelApi';
import { convertPriceWithSymbol } from '../../utils/currency';

import styles from './HotelDetails.module.css';

const HotelDetails = () => {
  const { id } = useParams();

  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { guests, checkIn, checkOut } = useSelector((state) => state.search);

  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  if (isLoading) {
    return <p>{text.hotels.loading}</p>;
  }

  if (error) {
    return <p>{text.hotels.error}</p>;
  }

  const hotel = hotels.find((hotel) => hotel.id === +id);

  if (!hotel) {
    return <p>{text.hotels.details.notFound}</p>;
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
              <p className={styles.description}>
                {text.hotels.descriptions[hotel.id] || hotel.description}
              </p>
            </div>

            <span className={styles.category}>★ {hotel.category}</span>
          </div>

          <div className={styles.amenities}>
            <h2>{text.hotels.details.amenities}</h2>

            <div className={styles.amenitiesList}>
              {hotel.amenities.wifi && <span>Wi-Fi</span>}

              {hotel.amenities.airConditioning && (
                <span>{text.hotels.filters.airConditioning}</span>
              )}

              {hotel.amenities.pool && <span>{text.hotels.filters.pool}</span>}

              {hotel.amenities.parking && (
                <span>{text.hotels.filters.parking}</span>
              )}
            </div>
          </div>

          <section className={styles.rooms}>
            <h2>{text.hotels.details.rooms}</h2>

            <div className={styles.roomsList}>
              {hotel.roomTypes.map((room) => {
                const price = convertPriceWithSymbol(
                  room.pricePerNight,
                  currency,
                );

                return (
                  <article key={room.type} className={styles.room}>
                    <div>
                      <h3>{room.name}</h3>

                      <p>
                        {text.hotels.details.capacity} {room.capacity}{' '}
                        {text.hotels.details.guests}
                      </p>

                      <p>{room.beds}</p>
                    </div>

                    <div className={styles.roomInfo}>
                      <span className={styles.price}>
                        {price} {text.hotels.details.perNight}
                      </span>

                      <span className={styles.quantity}>
                        {room.quantity} {text.hotels.details.roomsCount}
                      </span>

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

                          navigate('/booking');
                        }}
                      >
                        {text.hotels.details.book}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default HotelDetails;
