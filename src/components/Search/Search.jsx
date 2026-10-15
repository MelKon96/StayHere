import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { translations } from '../../constants/translations';
import { ROUTES } from '../../constants/routes';
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
  const isFirstRender = useRef(true);

  const text = translations[language].search;
  const isHotelsPage = location.pathname === ROUTES.HOTELS;

  const showHint =
    hintVisible && !isLoading && activeItem === null && !isHotelsPage;

  const close = () => {
    setActiveItem(null);
  };

  const openLocation = () => {
    setActiveItem('location');
  };

  const openDate = () => {
    setActiveItem('date');
  };

  const goToHotels = () => {
    navigate(ROUTES.HOTELS);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setHintVisible(true);

    const timerId = setTimeout(() => {
      setHintVisible(false);
    }, HINT_DURATION);

    return () => clearTimeout(timerId);
  }, [city, guests, hotelFilters]);

  useEffect(() => {
    if (isHotelsPage) {
      setHintVisible(false);
    }
  }, [isHotelsPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setActiveItem(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

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
          className={`${styles.resultsHint} ${styles.clickable}`}
          onClick={goToHotels}
          role="status"
          aria-live="polite"
        >
          {`${text.found}: ${hotels.length}`}
        </div>
      )}
    </div>
  );
}
