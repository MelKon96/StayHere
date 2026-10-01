import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import Search from "../Search/Search";
import Container from "../container/Container";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.top}>
          <Link to="/" className={styles.logo}>
            Stayly
          </Link>
          <nav className={styles.navigation}>
            <Link to="/">Главная</Link>
            <Link to="/hotels">Отели</Link>
            <Link to="/my-bookings">Мои бронирования</Link>
          </nav>
          <button type="button" className={styles.settings} aria-label="Настройки">
            ☰
          </button>
        </div>
        <Search />
      </Container>
    </header>
  );
};

export default Header;
