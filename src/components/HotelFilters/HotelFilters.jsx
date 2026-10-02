import styles from "./HotelFilters.module.css";

const HotelFilters = ({ filters, onFiltersChange }) => {
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
      <h2 className={styles.title}>Фильтры</h2>

      <div className={styles.group}>
        <h3>Цена за ночь (€)</h3>

        <div className={styles.priceInputs}>
          <input type="number" placeholder="От" min="0" value={filters.minPrice} step="10" onChange={(event) => handlePriceChange("minPrice", event.target.value)} />

          <input type="number" placeholder="До" min="0" value={filters.maxPrice} step="10" onChange={(event) => handlePriceChange("maxPrice", event.target.value)} />
        </div>
      </div>

      <div className={styles.group}>
        <h3>Категория</h3>
        {[5, 4, 3, 2, 1].map((category) => (
          <label key={category}>
            <input type="checkbox" checked={filters.categories.includes(category)} onChange={() => handleCategoryChange(category)} />
            {category} {category === 5 ? "звёзд" : category === 1 ? "звезда" : "звезды"}
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <h3>Размер отеля</h3>
        <span>(Общее кол-во номеров)</span>

        <div className={styles.priceInputs}>
          <input type="number" placeholder="От" min="0" value={filters.minRooms} onChange={(event) => handleRoomsChange("minRooms", event.target.value)} />

          <input type="number" placeholder="До" min="0" value={filters.maxRooms} onChange={(event) => handleRoomsChange("maxRooms", event.target.value)} />
        </div>
      </div>

      <div className={styles.group}>
        <h3>Удобства</h3>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("wifi")} onChange={() => handleAmenityChange("wifi")} />
          Wi-Fi
        </label>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("airConditioning")} onChange={() => handleAmenityChange("airConditioning")} />
          Кондиционер
        </label>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("pool")} onChange={() => handleAmenityChange("pool")} />
          Бассейн
        </label>

        <label>
          <input type="checkbox" checked={filters.amenities.includes("parking")} onChange={() => handleAmenityChange("parking")} />
          Парковка
        </label>
      </div>
    </div>
  );
};

export default HotelFilters;
