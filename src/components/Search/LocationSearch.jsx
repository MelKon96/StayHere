import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { setCity } from '../../helpers/store/slices/search/searchSlice';
import { useGetHotelsQuery } from '../../services/hotelApi';
import { translations } from '../../constants/translations';
import useDebounce from '../../hooks/useDebounce';

import styles from './Search.module.css';

const DEBOUNCE_MS = 300;

const selectCityNames = createSelector(
  (result) => result.data,
  (hotels = []) => [...new Set(hotels.map((hotel) => hotel.location))],
);

export default function LocationSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const city = useSelector((state) => state.search.city);

  const text = translations[language].search;

  const [inputValue, setInputValue] = useState(city);

  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_MS);

  const { cityNames } = useGetHotelsQuery(undefined, {
    selectFromResult: (result) => ({ cityNames: selectCityNames(result) }),
  });

  const query = inputValue.trim().toLowerCase();

  const filteredCities = query
    ? cityNames.filter((name) => name.toLowerCase().includes(query))
    : [];

  const exampleCities = cityNames.slice(0, 2);

  const placeholder =
    exampleCities.length > 0
      ? `${exampleCities.join(', ')}...`
      : text.destinationPlaceholder;

  // Внешнее изменение города
  useEffect(() => {
    setInputValue((prev) => (prev.trim() === city ? prev : city));
  }, [city]);

  useEffect(() => {
    dispatch(setCity(debouncedInputValue.trim()));
  }, [debouncedInputValue, dispatch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCitySelect = (event, selectedCity) => {
    event.stopPropagation();

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
