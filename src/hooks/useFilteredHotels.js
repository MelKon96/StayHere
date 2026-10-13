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

const getTotalCapacity = (hotel) =>
  hotel.roomTypes.reduce((sum, room) => sum + room.capacity * room.quantity, 0);

export function useFilteredHotels() {
  const { data: hotels = [], isLoading, error } = useGetHotelsQuery();

  const city = useSelector((state) => state.search.city);
  const guests = useSelector((state) => state.search.guests);
  const currency = useSelector((state) => state.settings.currency);
  const filters = useSelector((state) => state.hotelFilters);

  const { filteredHotels, priceBounds, roomsBounds } = useMemo(() => {
    const normalizedCity = city.trim().toLowerCase();

    const minPrice =
      filters.minPrice !== '' ? Number(filters.minPrice) : -Infinity;
    const maxPrice =
      filters.maxPrice !== '' ? Number(filters.maxPrice) : Infinity;

    const baseHotels = hotels.filter((hotel) => {
      if (
        normalizedCity &&
        !hotel.location.toLowerCase().includes(normalizedCity)
      ) {
        return false;
      }

      if (getTotalCapacity(hotel) < guests) return false;

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

      return true;
    });

    const hotelsInSizeRange = baseHotels.filter((hotel) => {
      if (filters.minRooms !== '' && hotel.rooms < Number(filters.minRooms))
        return false;
      if (filters.maxRooms !== '' && hotel.rooms > Number(filters.maxRooms))
        return false;

      return true;
    });

    const filtered = hotelsInSizeRange.filter((hotel) =>
      hotel.roomTypes.some((room) => {
        const price = convertPrice(room.pricePerNight, currency);
        return price >= minPrice && price <= maxPrice;
      }),
    );

    return {
      filteredHotels: filtered,

      priceBounds: getBounds(
        hotelsInSizeRange.flatMap((hotel) =>
          hotel.roomTypes.map((room) =>
            convertPrice(room.pricePerNight, currency),
          ),
        ),
      ),

      roomsBounds: getBounds(baseHotels.map((hotel) => hotel.rooms)),
    };
  }, [hotels, city, guests, currency, filters]);

  return { hotels: filteredHotels, isLoading, error, priceBounds, roomsBounds };
}
