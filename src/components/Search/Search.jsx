import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { translations } from '../../constants/translations';
import { useFilteredHotels } from '../../hooks/useFilteredHotels';

import LocationSearch from './LocationSearch';
import DateSearch from './DateSearch';
import GuestsSearch from './GuestsSearch';

import styles from './Search.module.css';

const HINT_DURATION = 5000;

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const language = useSelector((state) => state.settings.language);
  const city = useSelector((state) => state.search.city);
  const guests = useSelector((state) => state.search.guests);
  const hotelFilters = useSelector((state) => state.hotelFilters);

  const { hotels, isLoading } = useFilteredHotels();

  const [activeItem, setActiveItem] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);

  const searchRef = useRef(null);
  const prevFilters = useRef({ city, guests, hotelFilters });

  const text = useMemo(() => translations[language].search, [language]);

  const isHotelsPage = useMemo(
    () => location.pathname === '/hotels',
    [location.pathname],
  );

  const showHint = useMemo(
    () => hintVisible && !isLoading && activeItem === null,
    [hintVisible, isLoading, activeItem],
  );

  const close = useCallback(() => {
    setActiveItem(null);
  }, []);

  const openLocation = useCallback(() => {
    setActiveItem('location');
  }, []);

  const openDate = useCallback(() => {
    setActiveItem('date');
  }, []);

  const goToHotels = useCallback(() => {
    navigate('/hotels');
  }, [navigate]);

  const handleClickOutside = useCallback((event) => {
    if (!searchRef.current?.contains(event.target)) {
      setActiveItem(null);
    }
  }, []);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      setActiveItem(null);
    }
  }, []);

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

    const id = setTimeout(() => {
      setHintVisible(false);
    }, HINT_DURATION);

    return () => clearTimeout(id);
  }, [city, guests, hotelFilters]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleClickOutside, handleEscape]);

  return (
    <div ref={searchRef} className={styles.search}>
      <LocationSearch
        active={activeItem === 'location'}
        onOpen={openLocation}
        onClose={close}
      />

      <DateSearch
        active={activeItem === 'date'}
        onOpen={openDate}
        onClose={close}
      />

      <GuestsSearch active={activeItem === 'guests'} />

      {showHint && (
        <div
          className={`${styles.resultsHint} ${
            !isHotelsPage ? styles.clickable : ''
          }`}
          onClick={!isHotelsPage ? goToHotels : undefined}
          role="status"
          aria-live="polite"
        >
          {`${text.found}: ${hotels.length}`}
        </div>
      )}
    </div>
  );
}
