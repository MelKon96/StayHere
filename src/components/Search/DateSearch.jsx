import { useDispatch, useSelector } from "react-redux";

import { setCheckIn, setCheckOut } from "../../features/search/searchSlice";

import styles from "./Search.module.css";

export default function DateSearch({ active, onOpen }) {
  const dispatch = useDispatch();

  const { checkIn, checkOut } = useSelector((state) => state.search);

  return (
    <div className={`${styles.item} ${active ? styles.active : ""}`} onClick={onOpen}>
      <span className={styles.label}>Когда</span>
      <span className={styles.searchValue}>{checkIn && checkOut ? `${checkIn} — ${checkOut}` : checkIn ? `${checkIn} — Выберите выезд` : "Добавьте даты"}</span>

      {active && (
        <div className={styles.datePicker} onClick={(event) => event.stopPropagation()}>
          <label>
            Заезд
            <input type="date" value={checkIn || ""} onChange={(event) => dispatch(setCheckIn(event.target.value))} />
          </label>

          <label>
            Выезд
            <input type="date" value={checkOut || ""} min={checkIn || undefined} onChange={(event) => dispatch(setCheckOut(event.target.value))} />
          </label>
        </div>
      )}
    </div>
  );
}
