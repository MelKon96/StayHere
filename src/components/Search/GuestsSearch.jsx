import { useDispatch, useSelector } from 'react-redux';

import { setGuests } from '../../features/search/searchSlice';
import { translations } from '../../constants/translations';

import styles from './Search.module.css';

export default function GuestsSearch({ active, onOpen }) {
  const dispatch = useDispatch();

  const guests = useSelector((state) => state.search.guests);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  const decreaseGuests = () => {
    dispatch(setGuests(guests - 1));
  };

  const increaseGuests = () => {
    dispatch(setGuests(guests + 1));
  };

  const guestLabel =
    language === 'ru'
      ? guests === 1
        ? text.search.guest
        : text.search.guestsPlural
      : guests === 1
        ? text.search.guest
        : text.search.guestsPlural;

  return (
    <div
      className={`${styles.item} ${active ? styles.active : ''}`}
      onClick={onOpen}
    >
      <span className={styles.label}>{text.search.who}</span>

      <span className={styles.searchValue}>
        {guests} {guestLabel}
      </span>

      {active && (
        <div
          className={styles.guestsPicker}
          onClick={(event) => event.stopPropagation()}
        >
          <span>{text.search.guests}</span>

          <div className={styles.guestsControls}>
            <button
              type="button"
              onClick={decreaseGuests}
              disabled={guests === 1}
            >
              −
            </button>

            <span>{guests}</span>

            <button type="button" onClick={increaseGuests}>
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
