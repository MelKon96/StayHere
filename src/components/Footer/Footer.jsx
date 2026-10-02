import { useDispatch, useSelector } from "react-redux";

import Container from "../container/Container";
import { setCurrency } from "../../features/settings/settingsSlice";

import styles from "./Footer.module.css";

const Footer = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.settings.currency);

  const handleCurrencyChange = () => {
    const newCurrency = currency === "EUR" ? "USD" : "EUR";

    dispatch(setCurrency(newCurrency));
    localStorage.setItem("stayhere_currency", newCurrency);
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.copyright}>© 2026 Stayhere</div>

          <div className={styles.settings}>
            <button type="button">Русский</button>

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
