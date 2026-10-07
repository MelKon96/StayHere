import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCity } from '../../features/search/searchSlice';
import { useGetHotelsQuery } from '../../services/hotelApi';
import { translations } from '../../constants/translations';
import useDebounce from '../../hooks/useDebounce';

import styles from './Search.module.css';

export default function LocationSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.settings.language);
  const text = translations[language].search;

  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);

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

    // Если поле очистили, снимаем фильтр по городу
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
          placeholder={text.destinationPlaceholder}
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
