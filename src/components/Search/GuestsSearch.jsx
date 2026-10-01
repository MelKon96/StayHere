import { useDispatch, useSelector } from "react-redux";

import { setGuests } from "../../features/search/searchSlice";

import styles from "./Search.module.css";

export default function GuestsSearch({ active, onOpen }) {
  const dispatch = useDispatch();

  const guests = useSelector((state) => state.search.guests);

  const decreaseGuests = () => {
    dispatch(setGuests(guests - 1));
  };

  const increaseGuests = () => {
    dispatch(setGuests(guests + 1));
  };

  return (
    <div className={`${styles.item} ${active ? styles.active : ""}`} onClick={onOpen}>
      <span className={styles.label}>Кто</span>

      <span className={styles.searchValue}>
        {guests} {guests === 1 ? "гость" : "гостей"}
      </span>

      {active && (
        <div className={styles.guestsPicker} onClick={(event) => event.stopPropagation()}>
          <span>Гости</span>

          <div className={styles.guestsControls}>
            <button type="button" onClick={decreaseGuests} disabled={guests === 1}>
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
