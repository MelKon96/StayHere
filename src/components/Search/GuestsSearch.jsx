import { useDispatch, useSelector } from 'react-redux';

import { setGuests } from '../../helpers/store/slices/search/searchSlice';
import { translations } from '../../constants/translations';

import styles from './Search.module.css';

const MIN_GUESTS = 1;
const MAX_GUESTS = 9;

export default function GuestsSearch({ onOpen }) {
  const dispatch = useDispatch();

  const guests = useSelector((state) => state.search.guests);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  const guestLabel =
    guests === 1 ? text.search.guest : text.search.guestsPlural;

  return (
    <div className={`${styles.item} ${styles.guestsItem}`} onClick={onOpen}>
      <span className={styles.label}>{text.search.who}</span>

      <div className={styles.guestsStepper}>
        <button
          type="button"
          className={styles.stepperButton}
          onClick={() => dispatch(setGuests(guests - 1))}
          disabled={guests <= MIN_GUESTS}
          aria-label={text.search.decreaseGuests}
        >
          −
        </button>

        <span className={styles.guestsValue} aria-live="polite">
          {guests} {guestLabel}
        </span>

        <button
          type="button"
          className={styles.stepperButton}
          onClick={() => dispatch(setGuests(guests + 1))}
          disabled={guests >= MAX_GUESTS}
          aria-label={text.search.increaseGuests}
        >
          +
        </button>
      </div>
    </div>
  );
}
