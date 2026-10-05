import { useDispatch, useSelector } from "react-redux";

import { setCheckIn, setCheckOut } from "../../features/search/searchSlice";
import { translations } from "../../constants/translations";

import styles from "./Search.module.css";

export default function DateSearch({ active, onOpen }) {
  const dispatch = useDispatch();

  const { checkIn, checkOut } = useSelector((state) => state.search);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  const handleCheckInChange = (event) => {
    const newCheckIn = event.target.value;
    dispatch(setCheckIn(newCheckIn));
    if (checkOut && newCheckIn > checkOut) {
      dispatch(setCheckOut(""));
    }
  };

  const handleCheckOutChange = (event) => {
    const newCheckOut = event.target.value;
    if (checkIn && newCheckOut < checkIn) {
      return;
    }
    dispatch(setCheckOut(newCheckOut));
  };

  return (
    <div className={`${styles.item} ${active ? styles.active : ""}`} onClick={onOpen}>
      <span className={styles.label}>{text.search.dates}</span>

      <span className={styles.searchValue}>
        {checkIn && checkOut ? (
          <span className={styles.dateRange}>
            {checkIn} — {checkOut}
          </span>
        ) : checkIn ? (
          <span className={styles.dateRange}>
            {checkIn} — {text.search.selectCheckout}
          </span>
        ) : (
          text.search.addDates
        )}
      </span>

      {active && (
        <div className={styles.datePicker} onClick={(event) => event.stopPropagation()}>
          <label>
            {text.search.checkIn}

            <input type="date" value={checkIn || ""} onChange={handleCheckInChange} />
          </label>

          <label>
            {text.search.checkOut}

            <input type="date" value={checkOut || ""} min={checkIn || undefined} onChange={handleCheckOutChange} />
          </label>
        </div>
      )}
    </div>
  );
}
