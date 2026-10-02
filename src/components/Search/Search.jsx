import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { applySearch } from "../../features/search/searchSlice";
import { translations } from "../../constants/translations";

import LocationSearch from "./LocationSearch";
import DateSearch from "./DateSearch";
import GuestsSearch from "./GuestsSearch";

import styles from "./Search.module.css";

export default function Search() {
  const [activeItem, setActiveItem] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const text = translations[language];

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setActiveItem(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    dispatch(applySearch());
    setActiveItem(null);
    navigate("/hotels");
  };

  return (
    <div ref={searchRef} className={styles.search}>
      <LocationSearch active={activeItem === "location"} onOpen={() => setActiveItem("location")} onClose={() => setActiveItem(null)} />

      <DateSearch active={activeItem === "date"} onOpen={() => setActiveItem("date")} />

      <GuestsSearch active={activeItem === "guests"} onOpen={() => setActiveItem("guests")} />

      <button type="button" className={styles.searchButton} onClick={handleSearch}>
        {text.search.find}
      </button>
    </div>
  );
}
