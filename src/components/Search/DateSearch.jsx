import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCheckIn,
  setCheckOut,
} from '../../helpers/store/slices/search/searchSlice';
import { translations } from '../../constants/translations';
import {
  toISO,
  fromISO,
  startOfMonth,
  addMonths,
  today,
} from '../../utils/date';

import styles from './Search.module.css';

// Сетка месяца: неделя начинается с понедельника, пустые ячейки = null
const buildMonthCells = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array(offset).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(toISO(new Date(year, month, day)));
  }
  return cells;
};

export default function DateSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();

  const { checkIn, checkOut } = useSelector((state) => state.search);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];
  const locale = language || 'en';

  const rootRef = useRef(null);
  const todayISO = useMemo(() => toISO(today()), []);

  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(checkIn ? fromISO(checkIn) : today()),
  );
  const [hovered, setHovered] = useState(null);

  // Локализованные названия месяцев и дней недели
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
    [locale],
  );
  const shortFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }),
    [locale],
  );
  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    // 2024-01-01 — понедельник
    return Array.from({ length: 7 }, (_, i) =>
      formatter.format(new Date(2024, 0, 1 + i)),
    );
  }, [locale]);

  // Закрытие по клику снаружи и по Escape
  useEffect(() => {
    if (!active) return undefined;

    const handleOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target))
        onClose?.();
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [active, onClose]);

  const handleDayClick = (iso) => {
    if (!checkIn || checkOut || iso <= checkIn) {
      dispatch(setCheckIn(iso));
      dispatch(setCheckOut(''));
      return;
    }
    dispatch(setCheckOut(iso));
    setHovered(null);
    onClose?.();
  };

  const clearDates = (event) => {
    event.stopPropagation();
    dispatch(setCheckIn(''));
    dispatch(setCheckOut(''));
  };

  const canGoPrev = visibleMonth > startOfMonth(today());

  const rangeEnd =
    checkOut || (checkIn && hovered && hovered > checkIn ? hovered : '');

  const renderMonth = (monthDate) => (
    <div className={styles.calendarMonth} key={toISO(monthDate)}>
      <div className={styles.calendarMonthTitle}>
        {monthFormatter.format(monthDate)}
      </div>

      <div className={styles.calendarGrid}>
        {weekdays.map((name) => (
          <span key={name} className={styles.calendarWeekday}>
            {name}
          </span>
        ))}

        {buildMonthCells(monthDate).map((iso, index) => {
          if (!iso) return <span key={`empty-${index}`} />;

          const disabled = iso < todayISO;
          const isStart = iso === checkIn;
          const isEnd = iso === checkOut;
          const inRange =
            checkIn && rangeEnd && iso > checkIn && iso < rangeEnd;
          const hasTail = isStart && rangeEnd; // закругление/полоса справа от заезда

          const classes = [
            styles.calendarDay,
            disabled ? styles.calendarDayDisabled : '',
            isStart || isEnd ? styles.calendarDaySelected : '',
            inRange ? styles.calendarDayInRange : '',
            hasTail ? styles.calendarDayStart : '',
            isEnd ? styles.calendarDayEnd : '',
            iso === todayISO ? styles.calendarDayToday : '',
          ].join(' ');

          return (
            <button
              key={iso}
              type="button"
              className={classes}
              disabled={disabled}
              aria-pressed={isStart || isEnd}
              aria-label={fromISO(iso).toLocaleDateString(locale, {
                dateStyle: 'full',
              })}
              onClick={() => handleDayClick(iso)}
              onMouseEnter={() => setHovered(iso)}
              onMouseLeave={() => setHovered(null)}
            >
              {Number(iso.slice(8))}
            </button>
          );
        })}
      </div>
    </div>
  );

  const formatValue = (iso) => shortFormatter.format(fromISO(iso));

  return (
    <div
      ref={rootRef}
      className={`${styles.item} ${active ? styles.active : ''}`}
      onClick={onOpen}
    >
      <span className={styles.label}>{text.search.dates}</span>

      <span className={styles.searchValue}>
        {checkIn && checkOut ? (
          <span className={styles.dateRange}>
            {formatValue(checkIn)} — {formatValue(checkOut)}
          </span>
        ) : checkIn ? (
          <span className={styles.dateRange}>
            {formatValue(checkIn)} — {text.search.selectCheckout}
          </span>
        ) : (
          text.search.addDates
        )}
      </span>

      {active && (
        <div
          className={styles.datePicker}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.calendarNav}
              disabled={!canGoPrev}
              aria-label="Previous month"
              onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.calendarNav}
              aria-label="Next month"
              onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
            >
              ›
            </button>
          </div>

          <div className={styles.calendarMonths}>
            {renderMonth(visibleMonth)}
            <div className={styles.calendarSecondMonth}>
              {renderMonth(addMonths(visibleMonth, 1))}
            </div>
          </div>

          {(checkIn || checkOut) && (
            <div className={styles.calendarFooter}>
              <button
                type="button"
                className={styles.calendarClear}
                onClick={clearDates}
              >
                {text.search.clear || 'Clear'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
