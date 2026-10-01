import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import LocationSearch from "./LocationSearch";
import DateSearch from "./DateSearch";
import GuestsSearch from "./GuestsSearch";

import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import { applySearch } from "../../features/search/searchSlice";

export default function Search() {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
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
        Найти
      </button>
    </div>
  );
}
