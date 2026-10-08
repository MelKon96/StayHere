import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CURRENCIES } from '../../constants/currencies';
import { LANGUAGES } from '../../constants/languages';
import { translations } from '../../constants/translations';
import {
  setCurrency,
  setLanguage,
} from '../../features/settings/settingsSlice';

import styles from './Header.module.css';

import Search from '../Search/Search';
import Container from '../Container/Container';

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
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`${styles.flagButton} ${
                    language === item.code ? styles.active : ''
                  }`}
                  onClick={() => dispatch(setLanguage(item.code))}
                  aria-label={item.name}
                  title={item.name}
                >
                  {item.flag}
                </button>
              ))}
            </div>

            <div className={styles.currencies}>
              {CURRENCIES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`${styles.currencyButton} ${
                    currency === item.code ? styles.active : ''
                  }`}
                  onClick={() => dispatch(setCurrency(item.code))}
                >
                  {item.code}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={
              isMenuOpen ? text.header.closeMenu : text.header.openMenu
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={toggleMenu}
          >
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
                <div className={styles.languages}>
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      className={language === item.code ? styles.active : ''}
                      onClick={() => {
                        dispatch(setLanguage(item.code));
                        closeMenu();
                      }}
                    >
                      {item.flag} {item.name}
                    </button>
                  ))}
                </div>

                <div className={styles.currencies}>
                  {CURRENCIES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      className={currency === item.code ? styles.active : ''}
                      onClick={() => {
                        dispatch(setCurrency(item.code));
                        closeMenu();
                      }}
                    >
                      {item.code} {item.symbol}
                    </button>
                  ))}
                </div>
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
