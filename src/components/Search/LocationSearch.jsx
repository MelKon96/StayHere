import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCity } from "../../features/search/searchSlice";
import { useGetHotelsQuery } from "../../services/hotelApi";
import { translations } from "../../constants/translations";

import styles from "./Search.module.css";
import useDebounce from "../../hooks/useDebounce";

export default function LocationSearch({ active, onOpen, onClose }) {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const text = translations[language];

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

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputValue(value);
    dispatch(setCity(value));
  };

  return (
    <div className={`${styles.item} ${active ? styles.active : ""}`} onClick={onOpen}>
      <span className={styles.label}>{text.search.destination}</span>

      <div className={styles.searchField}>
        <input type="text" placeholder={text.search.destinationPlaceholder} value={inputValue} className={styles.searchValue} onChange={handleInputChange} />
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
