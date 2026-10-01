import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import Search from "../Search/Search";
import Container from "../container/Container";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.top}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            Stayhere
          </Link>

          <nav className={styles.navigation}>
            <Link to="/">Главная</Link>
            <Link to="/hotels">Отели</Link>
            <Link to="/my-bookings">Мои бронирования</Link>
          </nav>

          <button type="button" className={styles.menuButton} aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={toggleMenu}>
            ☰
          </button>

          {isMenuOpen && (
            <nav id="mobile-navigation" className={styles.mobileMenu}>
              <Link to="/" onClick={closeMenu}>
                Главная
              </Link>

              <Link to="/hotels" onClick={closeMenu}>
                Отели
              </Link>

              <Link to="/my-bookings" onClick={closeMenu}>
                Мои бронирования
              </Link>
            </nav>
          )}
        </div>

        <Search />
      </Container>
    </header>
  );
};

export default Header;
