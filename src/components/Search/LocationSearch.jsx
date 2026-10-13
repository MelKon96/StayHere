import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCity } from '../../helpers/store/slices/search/searchSlice';
import { useGetHotelsQuery } from '../../services/hotelApi';
import { translations } from '../../constants/translations';

import styles from './Search.module.css';

const DEBOUNCE_MS = 300;

export default function LocationSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const city = useSelector((state) => state.search.city);

  const text = translations[language].search;

  const [inputValue, setInputValue] = useState(city);

  const timerRef = useRef(null);

  const { data: hotels = [] } = useGetHotelsQuery();

  const cityNames = useMemo(
    () => [...new Set(hotels.map((hotel) => hotel.location))],
    [hotels],
  );

  const exampleCities = cityNames.slice(0, 2);

  const placeholder =
    exampleCities.length > 0
      ? `${exampleCities.join(', ')}...`
      : text.destinationPlaceholder;

  const query = inputValue.trim().toLowerCase();

  const filteredCities = query
    ? cityNames.filter((name) => name.toLowerCase().includes(query))
    : [];

  useEffect(() => {
    clearTimeout(timerRef.current);
    setInputValue((prev) => (prev.trim() === city ? prev : city));
  }, [city]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputValue(value);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => dispatch(setCity(value.trim())),
      DEBOUNCE_MS,
    );
  };

  const handleCitySelect = (event, selectedCity) => {
    event.stopPropagation();
    clearTimeout(timerRef.current);

    setInputValue(selectedCity);
    dispatch(setCity(selectedCity));
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
          placeholder={placeholder}
          value={inputValue}
          className={styles.searchValue}
          onChange={handleInputChange}
          onFocus={onOpen}
        />
      </div>

      {showSuggestions && (
        <div className={styles.suggestions}>
          {filteredCities.map((name) => (
            <button
              key={name}
              type="button"
              onClick={(event) => handleCitySelect(event, name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
