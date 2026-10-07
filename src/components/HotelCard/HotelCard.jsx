import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { translations } from '../../constants/translations';
import { convertPrice, getCurrencySymbol } from '../../utils/currency';

import styles from './HotelCard.module.css';

const HotelCard = ({ hotel, loading = false }) => {
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  if (loading) {
    return (
      <article className={`${styles.card} ${styles.skeletonCard}`}>
        <div className={styles.skeletonImage} />

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.skeletonInfo}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonLocation} />
            </div>

            <div className={styles.skeletonCategory} />
          </div>

          <div className={styles.skeletonPrice} />
          <div className={styles.skeletonButton} />
        </div>
      </article>
    );
  }

  const cheapestRoom = hotel.roomTypes.reduce((cheapest, room) =>
    room.pricePerNight < cheapest.pricePerNight ? room : cheapest,
  );

  const price = convertPrice(cheapestRoom.pricePerNight, currency);
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <article className={styles.card}>
      <Link to={`/hotels/${hotel.id}`} className={styles.imageLink}>
        <img src={hotel.images[0]} alt={hotel.name} className={styles.image} />
      </Link>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{hotel.name}</h2>
            <p className={styles.location}>{hotel.location}</p>
          </div>

          <span className={styles.category}>★ {hotel.category}</span>
        </div>

        <p className={styles.price}>
          {text.hotels.card.from} {price.toFixed(2)} {currencySymbol}{' '}
          {text.hotels.card.perNight}
        </p>

        <Link to={`/hotels/${hotel.id}`} className={styles.detailsLink}>
          {text.hotels.card.details}
        </Link>
      </div>
    </article>
  );
};

export default HotelCard;
