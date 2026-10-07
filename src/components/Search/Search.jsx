import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useFilteredHotels } from '../../hooks/useFilteredHotels';
import { translations } from '../../constants/translations';

import LocationSearch from './LocationSearch';
import DateSearch from './DateSearch';
import GuestsSearch from './GuestsSearch';

import styles from './Search.module.css';

const HINT_DURATION = 5000;

export default function Search() {
  const language = useSelector((state) => state.settings.language);
  const text = translations[language].search;

  const { hotels, isLoading } = useFilteredHotels();

  const [activeItem, setActiveItem] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);

  const searchRef = useRef(null);
  const city = useSelector((state) => state.search.city);
  const guests = useSelector((state) => state.search.guests);
  const hotelFilters = useSelector((state) => state.hotelFilters);

  const prevFilters = useRef({ city, guests, hotelFilters });

  useEffect(() => {
    const prev = prevFilters.current;

    if (
      prev.city === city &&
      prev.guests === guests &&
      prev.hotelFilters === hotelFilters
    ) {
      return;
    }

    prevFilters.current = { city, guests, hotelFilters };

    setHintVisible(true);
    const id = setTimeout(() => setHintVisible(false), HINT_DURATION);

    return () => clearTimeout(id);
  }, [city, guests, hotelFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current?.contains(event.target)) setActiveItem(null);
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') setActiveItem(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const prev = prevFilters.current;
    if (prev.city === city && prev.hotelFilters === hotelFilters) return;

    prevFilters.current = { city, hotelFilters };

    setHintVisible(true);
    const id = setTimeout(() => setHintVisible(false), HINT_DURATION);

    return () => clearTimeout(id);
  }, [city, hotelFilters]);

  const close = () => setActiveItem(null);

  const showHint = hintVisible && !isLoading && activeItem === null;

  return (
    <div ref={searchRef} className={styles.search}>
      <LocationSearch
        active={activeItem === 'location'}
        onOpen={() => setActiveItem('location')}
        onClose={close}
      />
      <DateSearch
        active={activeItem === 'date'}
        onOpen={() => setActiveItem('date')}
      />
      <GuestsSearch
        active={activeItem === 'guests'}
        onOpen={() => setActiveItem('guests')}
      />

      {showHint && (
        <div className={styles.resultsHint} role="status" aria-live="polite">
          {`${text.found}: ${hotels.length}`}
        </div>
      )}
    </div>
  );
}
