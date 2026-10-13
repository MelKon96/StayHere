import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CURRENCIES } from '../../constants/currencies';
import { LANGUAGES } from '../../constants/languages';
import { translations } from '../../constants/translations';
import { ROUTES } from '../../constants/routes';
import {
  setCurrency,
  setLanguage,
} from '../../helpers/store/slices/settings/settingsSlice';

import Search from '../Search/Search';
import Container from '../Container/Container';
import SettingsModal from '../SettingsModal/SettingsModal';

import styles from './Header.module.css';

const FlagIcon = ({ src, size }) => (
  <img src={src} alt="" width={size} height={size} className={styles.flag} />
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.settings.language);
  const currency = useSelector((state) => state.settings.currency);

  const text = translations[language];

  const currentLanguage = LANGUAGES.find((item) => item.code === language);
  const currentCurrency = CURRENCIES.find((item) => item.code === currency);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const openModal = (type) => {
    closeMenu();
    setActiveModal(type);
  };
  const closeModal = () => setActiveModal(null);

  const languageOptions = LANGUAGES.map((item) => ({
    value: item.code,
    label: item.name,
    icon: <FlagIcon src={item.flag} size={28} />,
  }));

  const currencyOptions = CURRENCIES.map((item) => ({
    value: item.code,
    label: item.name ? `${item.name}` : item.code,
    hint: `${item.code} · ${item.symbol}`,
  }));

  const settingsButtons = (
    <>
      <button
        type="button"
        className={styles.settingsButton}
        onClick={() => openModal('language')}
        aria-haspopup="dialog"
        aria-label={`${text.header.selectLanguage}: ${currentLanguage?.name}`}
        title={text.header.selectLanguage}
      >
        <FlagIcon src={currentLanguage?.flag} size={22} />
      </button>

      <button
        type="button"
        className={styles.settingsButton}
        onClick={() => openModal('currency')}
        aria-haspopup="dialog"
        aria-label={`${text.header.selectCurrency}: ${currency}`}
        title={text.header.selectCurrency}
      >
        {currentCurrency?.code} {currentCurrency?.symbol}
      </button>
    </>
  );

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.top}>
          <Link to={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
            Stayhere
          </Link>

          <nav className={styles.navigation}>
            <Link to={ROUTES.HOME}>{text.header.home}</Link>
            <Link to={ROUTES.HOTELS}>{text.header.hotels}</Link>
            <Link to={ROUTES.MY_BOOKINGS}>{text.header.bookings}</Link>
          </nav>

          <div className={styles.actions}>{settingsButtons}</div>

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
              <Link to={ROUTES.HOME} onClick={closeMenu}>
                {text.header.home}
              </Link>
              <Link to={ROUTES.HOTELS} onClick={closeMenu}>
                {text.header.hotels}
              </Link>
              <Link to={ROUTES.MY_BOOKINGS} onClick={closeMenu}>
                {text.header.bookings}
              </Link>
              <div className={styles.mobileSettings}>{settingsButtons}</div>
            </nav>
          )}
        </div>
        <Search />
      </Container>

      <SettingsModal
        isOpen={activeModal === 'language'}
        title={text.header.selectLanguage}
        closeLabel={text.header.close}
        options={languageOptions}
        selected={language}
        onSelect={(code) => dispatch(setLanguage(code))}
        onClose={closeModal}
      />

      <SettingsModal
        isOpen={activeModal === 'currency'}
        title={text.header.selectCurrency}
        closeLabel={text.header.close}
        options={currencyOptions}
        selected={currency}
        onSelect={(code) => dispatch(setCurrency(code))}
        onClose={closeModal}
      />
    </header>
  );
};

export default Header;
