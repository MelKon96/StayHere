import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCity } from '../../helpers/store/slices/search/searchSlice';
import { useGetHotelsQuery } from '../../services/hotelApi';
import { translations } from '../../constants/translations';
import useDebounce from '../../hooks/useDebounce';

import styles from './Search.module.css';

export default function LocationSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.settings.language);
  const city = useSelector((state) => state.search.city);
  const text = translations[language].search;

  const [inputValue, setInputValue] = useState(city);
  const debouncedValue = useDebounce(inputValue, 300);
  useEffect(() => {
    setInputValue(city);
  }, [city]);

  const { data: hotels = [] } = useGetHotelsQuery();

  const filteredCities = useMemo(() => {
    const query = debouncedValue.trim().toLowerCase();
    if (!query) return [];

    const cities = new Set(hotels.map((hotel) => hotel.location));
    return [...cities].filter((city) => city.toLowerCase().includes(query));
  }, [hotels, debouncedValue]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (!value) dispatch(setCity(''));
  };

  const handleCitySelect = (event, city) => {
    event.stopPropagation();
    setInputValue(city);
    dispatch(setCity(city));
    onClose();
  };

  const showSuggestions = active && filteredCities.length > 0;

  return (
    <div
      className={`${styles.item} ${active ? styles.active : ''}`}
      onClick={onOpen}
    >
      <label htmlFor="destination" className={styles.label}>
        {text.destination}
      </label>

      <div className={styles.searchField}>
        <input
          id="destination"
          type="text"
          autoComplete="off"
          placeholder={
            `${hotels[1]?.location}, ${hotels[2]?.location}...` ||
            text.destinationPlaceholder
          }
          value={inputValue}
          className={styles.searchValue}
          onChange={handleInputChange}
          onFocus={onOpen}
        />
      </div>

      {showSuggestions && (
        <div className={styles.suggestions}>
          {filteredCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={(event) => handleCitySelect(event, city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
