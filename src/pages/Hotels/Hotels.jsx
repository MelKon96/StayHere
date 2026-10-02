import { useState } from "react";
import { useSelector } from "react-redux";

import HotelCard from "../../components/HotelCard/HotelCard";
import HotelFilters from "../../components/HotelFilters/HotelFilters";
import { useGetHotelsQuery } from "../../services/hotelApi";

import styles from "./Hotels.module.css";

const Hotels = () => {
  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();
  const city = useSelector((state) => state.search.city);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    categories: [],
    minRooms: "",
    maxRooms: "",
    amenities: [],
  });

  const filteredHotels = hotels.filter((hotel) => {
    if (city && hotel.location !== city) {
      return false;
    }

    const cheapestRoom = hotel.roomTypes.reduce((cheapest, room) => (room.pricePerNight < cheapest.pricePerNight ? room : cheapest));

    const minPrice = cheapestRoom.pricePerNight;

    if (filters.minPrice !== "" && minPrice < Number(filters.minPrice)) {
      return false;
    }

    if (filters.maxPrice !== "" && minPrice > Number(filters.maxPrice)) {
      return false;
    }

    if (filters.categories.length > 0 && !filters.categories.includes(hotel.category)) {
      return false;
    }

    if (filters.minRooms !== "" && hotel.rooms < Number(filters.minRooms)) {
      return false;
    }

    if (filters.maxRooms !== "" && hotel.rooms > Number(filters.maxRooms)) {
      return false;
    }

    if (filters.amenities.length > 0 && !filters.amenities.every((amenity) => hotel.amenities[amenity])) {
      return false;
    }

    return true;
  });

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
          <HotelFilters filters={filters} onFiltersChange={setFilters} />
        </aside>

        <section className={styles.list}>{filteredHotels.length > 0 ? filteredHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />) : <p>По заданным фильтрам ничего не найдено.</p>}</section>
      </div>
    </main>
  );
};

export default Hotels;
