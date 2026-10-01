import { Link } from "react-router-dom";

import styles from "./HotelCard.module.css";

const HotelCard = ({ hotel }) => {
  const cheapestRoom = hotel.roomTypes.reduce((cheapest, room) => (room.pricePerNight < cheapest.pricePerNight ? room : cheapest));

  return (
    <article className={styles.card}>
      <img src={hotel.images[0]} alt={hotel.name} className={styles.image} />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{hotel.name}</h2>
            <p className={styles.location}>{hotel.location}</p>
          </div>

          <span className={styles.category}>★ {hotel.category}</span>
        </div>

        <p className={styles.price}>от {cheapestRoom.pricePerNight} € / ночь</p>

        <Link to={`/hotels/${hotel.id}`} className={styles.detailsLink}>
          Подробнее
        </Link>
      </div>
    </article>
  );
};

export default HotelCard;
