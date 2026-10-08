import { useSelector } from 'react-redux';
import { getCurrencySymbol } from '../../utils/currency';
import { translations } from '../../constants/translations';

import styles from './HotelFilters.module.css';

const CATEGORIES = [5, 4, 3, 2, 1];
const AMENITIES = ['wifi', 'airConditioning', 'pool', 'parking'];

const HotelFilters = ({
  filters,
  onFiltersChange,
  priceBounds,
  roomsBounds,
}) => {
  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language].hotels.filters;

  const boundsByField = {
    minPrice: priceBounds,
    maxPrice: priceBounds,
    minRooms: roomsBounds,
    maxRooms: roomsBounds,
  };

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

  const handleRangeBlur = (field) => {
    const raw = filters[field];
    if (raw === '') return;

    const isMin = field.startsWith('min');
    const counterpart = isMin
      ? field.replace('min', 'max')
      : field.replace('max', 'min');

    const other = filters[counterpart];
    if (other === '') return;

    const value = Number(raw);
    const otherValue = Number(other);

    if (isMin ? value > otherValue : value < otherValue) {
      handleChange(field, String(otherValue));
    }
  };

  const getRangeProps = (field) => {
    const bounds = boundsByField[field];
    const isMin = field.startsWith('min');

    const min = Number.isFinite(bounds?.min) ? bounds.min : 0;
    const max = Number.isFinite(bounds?.max) ? bounds.max : undefined;

    return {
      type: 'number',
      min,
      max,
      placeholder: bounds ? String(isMin ? min : (max ?? '')) : '',
      value: filters[field],
      onChange: (e) => handleChange(field, e.target.value),
      onBlur: () => handleRangeBlur(field),
    };
  };

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>{text.title}</h2>

      <div className={styles.group}>
        <h3>
          {text.pricePerNight} {getCurrencySymbol(currency)}
        </h3>

        <div className={styles.priceInputs}>
          <input {...getRangeProps('minPrice')} />
          <input {...getRangeProps('maxPrice')} />
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
          <input {...getRangeProps('minRooms')} />
          <input {...getRangeProps('maxRooms')} />
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
