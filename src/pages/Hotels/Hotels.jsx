import { useDispatch, useSelector } from 'react-redux';

import HotelCard from '../../components/HotelCard/HotelCard';
import HotelFilters from '../../components/HotelFilters/HotelFilters';
import { setHotelFilters } from '../../features/hotelFilters/hotelFiltersSlice';
import {useFilteredHotels} from '../../hooks/useFilteredHotels';
import { translations } from '../../constants/translations';

import styles from './Hotels.module.css';

const Hotels = () => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const filters = useSelector((state) => state.hotelFilters);
  const text = translations[language];

  const { hotels, isLoading, error } = useFilteredHotels();

  if (error) return <p>{text.hotels.error}</p>;

  const renderList = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => (
        <HotelCard key={index} loading />
      ));
    }

    if (hotels.length === 0) return <p>{text.hotels.noResults}</p>;

    return hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />);
  };

  return (
    <main className={styles.hotels}>
      <h1 className={styles.title}>{text.hotels.title}</h1>

      <div className={styles.content}>
        <aside className={styles.filters}>
          <HotelFilters
            filters={filters}
            onFiltersChange={(next) => dispatch(setHotelFilters(next))}
          />
        </aside>

        <section className={styles.list}>{renderList()}</section>
      </div>
    </main>
  );
};

export default Hotels;
