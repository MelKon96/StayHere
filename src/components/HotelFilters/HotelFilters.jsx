import { useSelector } from "react-redux";

import { translations } from "../../constants/translations";

import styles from "./HotelFilters.module.css";

const HotelFilters = ({ filters, onFiltersChange }) => {
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  const handlePriceChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleRoomsChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleCategoryChange = (category) => {
    const categories = filters.categories.includes(category) ? filters.categories.filter((item) => item !== category) : [...filters.categories, category];

    onFiltersChange({
      ...filters,
      categories,
    });
  };

  const handleAmenityChange = (amenity) => {
    const amenities = filters.amenities.includes(amenity) ? filters.amenities.filter((item) => item !== amenity) : [...filters.amenities, amenity];

    onFiltersChange({
      ...filters,
      amenities,
    });
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>{text.hotels.filters.title}</h2>

      <div className={styles.group}>
        <h3>
          {text.hotels.filters.pricePerNight} {currency === "USD" ? "$" : "€"}
        </h3>

        <div className={styles.priceInputs}>
          <input type="number" placeholder={text.hotels.filters.from} min="0" value={filters.minPrice} step="10" onChange={(event) => handlePriceChange("minPrice", event.target.value)} />

          <input type="number" placeholder={text.hotels.filters.to} min="0" value={filters.maxPrice} step="10" onChange={(event) => handlePriceChange("maxPrice", event.target.value)} />
        </div>
      </div>

      <div className={styles.group}>
        <h3>{text.hotels.filters.category}</h3>

        {[5, 4, 3, 2, 1].map((category) => (
          <label key={category}>
            <input type="checkbox" checked={filters.categories.includes(category)} onChange={() => handleCategoryChange(category)} />
            {category} {language === "ru" ? (category === 1 ? text.hotels.filters.star : category === 5 ? text.hotels.filters.stars : text.hotels.filters.starsPlural) : category === 1 ? text.hotels.filters.star : text.hotels.filters.stars}
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <h3>{text.hotels.filters.hotelSize}</h3>

        <span>{text.hotels.filters.totalRooms}</span>

        <div className={styles.priceInputs}>
          <input type="number" placeholder={text.hotels.filters.from} min="0" value={filters.minRooms} onChange={(event) => handleRoomsChange("minRooms", event.target.value)} />

          <input type="number" placeholder={text.hotels.filters.to} min="0" value={filters.maxRooms} onChange={(event) => handleRoomsChange("maxRooms", event.target.value)} />
        </div>
      </div>

      <div className={styles.group}>
        <h3>{text.hotels.filters.amenities}</h3>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("wifi")} onChange={() => handleAmenityChange("wifi")} />
          Wi-Fi
        </label>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("airConditioning")} onChange={() => handleAmenityChange("airConditioning")} />
          {text.hotels.filters.airConditioning}
        </label>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("pool")} onChange={() => handleAmenityChange("pool")} />
          {text.hotels.filters.pool}
        </label>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("parking")} onChange={() => handleAmenityChange("parking")} />
          {text.hotels.filters.parking}
        </label>
      </div>
    </div>
  );
};

export default HotelFilters;
