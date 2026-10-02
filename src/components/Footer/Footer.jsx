import { useDispatch, useSelector } from "react-redux";

import { translations } from "../../constants/translations";
import { setCurrency, setLanguage } from "../../features/settings/settingsSlice";
import Container from "../container/Container";

import styles from "./Footer.module.css";

const Footer = () => {
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.settings.currency);
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  const handleCurrencyChange = () => {
    const newCurrency = currency === "EUR" ? "USD" : "EUR";

    dispatch(setCurrency(newCurrency));
    localStorage.setItem("stayhere_currency", newCurrency);
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "ru" ? "en" : "ru";

    dispatch(setLanguage(newLanguage));
    localStorage.setItem("stayhere_language", newLanguage);
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.copyright}>© 2026 Stayhere</div>

          <div className={styles.settings}>
            <button type="button" onClick={handleLanguageChange}>
              {language === "ru" ? text.footer.russian : text.footer.english}
            </button>

            <button type="button" onClick={handleCurrencyChange}>
              {currency === "EUR" ? "EUR €" : "USD $"}
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
