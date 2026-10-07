import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHotelsQuery } from '../services/hotelApi.js';

export function useFilteredHotels() {
  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();

  const city = useSelector((state) => state.search.city);
  const guests = useSelector((state) => state.search.guests);
  const filters = useSelector((state) => state.hotelFilters);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (city && hotel.location !== city) return false;

      if (!hotel.roomTypes.some((room) => room.capacity >= guests)) {
        return false;
      }

      const minPrice = Math.min(
        ...hotel.roomTypes.map((room) => room.pricePerNight),
      );

      if (filters.minPrice !== '' && minPrice < Number(filters.minPrice))
        return false;
      if (filters.maxPrice !== '' && minPrice > Number(filters.maxPrice))
        return false;

      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(hotel.category)
      ) {
        return false;
      }

      if (filters.minRooms !== '' && hotel.rooms < Number(filters.minRooms))
        return false;
      if (filters.maxRooms !== '' && hotel.rooms > Number(filters.maxRooms))
        return false;

      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((amenity) => hotel.amenities[amenity])
      ) {
        return false;
      }

      return true;
    });
  }, [hotels, city, guests, filters]);

  return { hotels: filteredHotels, isLoading, error };
}
