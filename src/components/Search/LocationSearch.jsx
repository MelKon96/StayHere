import { useState } from "react";
import { useDispatch } from "react-redux";

import { useGetHotelsQuery } from "../../services/hotelApi";
import { setCity } from "../../features/search/searchSlice";

import styles from "./Search.module.css";
import useDebounce from "../../hooks/useDebounce";

export default function LocationSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, 300);

  const { data: hotels = [] } = useGetHotelsQuery();

  const cities = [...new Set(hotels.map((hotel) => hotel.location))];

  const filteredCities = cities.filter((city) => city.toLowerCase().includes(debouncedValue.toLowerCase()));

  const handleCitySelect = (city) => {
    setInputValue(city);
    dispatch(setCity(city));
    onClose();
  };

  return (
    <div className={`${styles.item} ${active ? styles.active : ""}`} onClick={onOpen}>
      <span className={styles.label}>Куда</span>

      <div className={styles.searchField}>
        <input type="text" placeholder="Куда ?" value={inputValue} className={styles.searchValue} onChange={(event) => setInputValue(event.target.value)} />
      </div>

      {active && debouncedValue && filteredCities.length > 0 && (
        <div className={styles.suggestions}>
          {filteredCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleCitySelect(city);
              }}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
