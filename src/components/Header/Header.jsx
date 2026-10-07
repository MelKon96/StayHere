import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { translations } from "../../constants/translations";
import { setCurrency, setLanguage } from "../../features/settings/settingsSlice";

import styles from "./Header.module.css";

import Search from "../Search/Search";
import Container from "../Container/Container";

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

 
  const handleSettingChange = (type, value) => {
    if (type === "language") {
      dispatch(setLanguage(value));
      localStorage.setItem("stayhere_language", value);
    } else {
      dispatch(setCurrency(value));
      localStorage.setItem("stayhere_currency", value);
    }
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

          <div className={styles.actions}>
            <div className={styles.languages}>
              <button type="button" className={`${styles.flagButton} ${language === "ru" ? styles.active : ""}`} onClick={() => handleSettingChange("language", "ru")} aria-label="Русский" title="Русский">
                🇷🇺
              </button>

              <button type="button" className={`${styles.flagButton} ${language === "en" ? styles.active : ""}`} onClick={() => handleSettingChange("language", "en")} aria-label="English" title="English">
                en
              </button>
            </div>

            <div className={styles.currencies}>
              <button type="button" className={`${styles.currencyButton} ${currency === "EUR" ? styles.active : ""}`} onClick={() => handleSettingChange("currency", "EUR")}>
                EUR
              </button>

              <button type="button" className={`${styles.currencyButton} ${currency === "USD" ? styles.active : ""}`} onClick={() => handleSettingChange("currency", "USD")}>
                USD
              </button>
            </div>
          </div>

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
                <button type="button" onClick={() => handleSettingChange("language", language === "ru" ? "en" : "ru")}>
                  {language === "ru" ? "Русский" : "English"}
                </button>

                <button type="button" onClick={() => handleSettingChange("currency", currency === "EUR" ? "USD" : "EUR")}>
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
