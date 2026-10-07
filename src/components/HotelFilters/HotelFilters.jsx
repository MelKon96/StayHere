import { useSelector } from 'react-redux';

import { translations } from '../../constants/translations';

import styles from './HotelFilters.module.css';

const CATEGORIES = [5, 4, 3, 2, 1];
const AMENITIES = ['wifi', 'airConditioning', 'pool', 'parking'];

const HotelFilters = ({ filters, onFiltersChange }) => {
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language].hotels.filters;

  const getStarsLabel = (count) => {
    if (count === 1) return text.star;
    if (language === 'ru' && count !== 5) return text.starsPlural;
    return text.stars;
  };

  const getAmenityLabel = (amenity) =>
    amenity === 'wifi' ? 'Wi-Fi' : text[amenity];

  const handleChange = (field, value) =>
    onFiltersChange({ ...filters, [field]: value });

  const toggleItem = (field, item) => {
    const list = filters[field];
    const next = list.includes(item)
      ? list.filter((value) => value !== item)
      : [...list, item];

    handleChange(field, next);
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>{text.title}</h2>

      <div className={styles.group}>
        <h3>
          {text.pricePerNight} {currency === 'USD' ? '$' : '€'}
        </h3>

        <div className={styles.priceInputs}>
          <input
            type="number"
            min="0"
            step="10"
            placeholder={text.from}
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
          <input
            type="number"
            min="0"
            step="10"
            placeholder={text.to}
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.group}>
        <h3>{text.category}</h3>

        {CATEGORIES.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => toggleItem('categories', category)}
            />
            {category} {getStarsLabel(category)}
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <h3>{text.hotelSize}</h3>

        <span>{text.totalRooms}</span>

        <div className={styles.priceInputs}>
          <input
            type="number"
            min="0"
            placeholder={text.from}
            value={filters.minRooms}
            onChange={(e) => handleChange('minRooms', e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder={text.to}
            value={filters.maxRooms}
            onChange={(e) => handleChange('maxRooms', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.group}>
        <h3>{text.amenities}</h3>

        {AMENITIES.map((amenity) => (
          <label key={amenity}>
            <input
              type="checkbox"
              checked={filters.amenities.includes(amenity)}
              onChange={() => toggleItem('amenities', amenity)}
            />
            {getAmenityLabel(amenity)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelFilters;
