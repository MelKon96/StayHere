import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHotelsQuery } from '../services/hotelApi.js';
import { convertPrice } from '../utils/currency.js';

const getBounds = (values) =>
  values.length === 0
    ? null
    : {
        min: Math.floor(Math.min(...values)),
        max: Math.ceil(Math.max(...values)),
      };

export function useFilteredHotels() {
  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();

  const city = useSelector((state) => state.search.city);
  const guests = useSelector((state) => state.search.guests);
  const currency = useSelector((state) => state.settings.currency);
  const filters = useSelector((state) => state.hotelFilters);

  const { filteredHotels, priceBounds, roomsBounds } = useMemo(() => {
    const min = filters.minPrice !== '' ? Number(filters.minPrice) : -Infinity;
    const max = filters.maxPrice !== '' ? Number(filters.maxPrice) : Infinity;

    // skip: 'price' | 'rooms' | null — какой фильтр пропустить
    const applyFilters = (skip) =>
      hotels.filter((hotel) => {
        if (city && hotel.location !== city) return false;

        if (!hotel.roomTypes.some((room) => room.capacity >= guests)) {
          return false;
        }

        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(hotel.category)
        ) {
          return false;
        }

        if (
          filters.amenities.length > 0 &&
          !filters.amenities.every((amenity) => hotel.amenities[amenity])
        ) {
          return false;
        }

        if (skip !== 'rooms') {
          if (filters.minRooms !== '' && hotel.rooms < Number(filters.minRooms))
            return false;
          if (filters.maxRooms !== '' && hotel.rooms > Number(filters.maxRooms))
            return false;
        }

        if (skip !== 'price') {
          const hasRoomInRange = hotel.roomTypes.some((room) => {
            if (room.capacity < guests) return false;
            const price = convertPrice(room.pricePerNight, currency);
            return price >= min && price <= max;
          });
          if (!hasRoomInRange) return false;
        }

        return true;
      });

    const forPriceBounds = applyFilters('price');
    const forRoomsBounds = applyFilters('rooms');

    return {
      filteredHotels: applyFilters(null),
      priceBounds: getBounds(
        forPriceBounds.flatMap((hotel) =>
          hotel.roomTypes
            .filter((room) => room.capacity >= guests)
            .map((room) => convertPrice(room.pricePerNight, currency)),
        ),
      ),
      roomsBounds: getBounds(forRoomsBounds.map((hotel) => hotel.rooms)),
    };
  }, [hotels, city, guests, currency, filters]);

  return { hotels: filteredHotels, isLoading, error, priceBounds, roomsBounds };
}
