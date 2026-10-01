import styles from "./HotelFilters.module.css";

const HotelFilters = () => {
  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Фильтры</h2>
      <div className={styles.group}>
        <h3>Цена за ночь</h3>
        <div className={styles.priceInputs}>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>
      </div>
      <div className={styles.group}>
        <h3>Категория</h3>
        <label>
          <input type="checkbox" />5 звёзд
        </label>
        <label>
          <input type="checkbox" />4 звезды
        </label>
        <label>
          <input type="checkbox" />3 звезды
        </label>
        <label>
          <input type="checkbox" />2 звезды
        </label>
        <label>
          <input type="checkbox" />1 звезда
        </label>
      </div>

      <div className={styles.group}>
        <h3>Размер отеля</h3>
        <div className={styles.priceInputs}>
          <input type="number" placeholder="От" />
          <input type="number" placeholder="До" />
        </div>
      </div>

      <div className={styles.group}>
        <h3>Удобства</h3>
        <label>
          <input type="checkbox" />
          Wi-Fi
        </label>
        <label>
          <input type="checkbox" />
          Кондиционер
        </label>
        <label>
          <input type="checkbox" />
          Бассейн
        </label>
        <label>
          <input type="checkbox" />
          Парковка
        </label>
      </div>
    </div>
  );
};

export default HotelFilters;
