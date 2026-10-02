import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { translations } from "../../constants/translations";
import { setCurrency, setLanguage } from "../../features/settings/settingsSlice";

import styles from "./Header.module.css";

import Search from "../Search/Search";
import Container from "../container/Container";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const language = useSelector((state) => state.settings.language);
  const currency = useSelector((state) => state.settings.currency);

  const text = translations[language];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "ru" ? "en" : "ru";

    dispatch(setLanguage(newLanguage));
    localStorage.setItem("stayhere_language", newLanguage);
  };

  const handleCurrencyChange = () => {
    const newCurrency = currency === "EUR" ? "USD" : "EUR";

    dispatch(setCurrency(newCurrency));
    localStorage.setItem("stayhere_currency", newCurrency);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.top}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            Stayhere
          </Link>

          <nav className={styles.navigation}>
            <Link to="/">{text.header.home}</Link>
            <Link to="/hotels">{text.header.hotels}</Link>
            <Link to="/my-bookings">{text.header.bookings}</Link>
          </nav>

          <button type="button" className={styles.menuButton} aria-label={isMenuOpen ? text.header.closeMenu : text.header.openMenu} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={toggleMenu}>
            ☰
          </button>

          {isMenuOpen && (
            <nav id="mobile-navigation" className={styles.mobileMenu}>
              <Link to="/" onClick={closeMenu}>
                {text.header.home}
              </Link>

              <Link to="/hotels" onClick={closeMenu}>
                {text.header.hotels}
              </Link>

              <Link to="/my-bookings" onClick={closeMenu}>
                {text.header.bookings}
              </Link>

              <div className={styles.mobileSettings}>
                <button type="button" onClick={handleLanguageChange}>
                  {language === "ru" ? "Русский" : "English"}
                </button>

                <button type="button" onClick={handleCurrencyChange}>
                  {currency === "EUR" ? "EUR €" : "USD $"}
                </button>
              </div>
            </nav>
          )}
        </div>

        <Search />
      </Container>
    </header>
  );
};

export default Header;
