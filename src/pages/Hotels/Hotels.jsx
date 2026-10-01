import HotelCard from "../../components/HotelCard/HotelCard";
import HotelFilters from "../../components/HotelFilters/HotelFilters";
import { useGetHotelsQuery } from "../../services/hotelApi";
import styles from "./Hotels.module.css";
import { useSelector } from "react-redux";

const Hotels = () => {
  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();
  const city = useSelector((state) => state.search.city);
  const filteredHotels = city ? hotels.filter((hotel) => hotel.location === city) : hotels;

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <main className={styles.hotels}>
      <h1 className={styles.title}>Найденные варианты</h1>
      <div className={styles.content}>
        <aside className={styles.filters}>
          <HotelFilters />
        </aside>
        <section className={styles.list}>
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Hotels;
