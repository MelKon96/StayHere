import styles from "./Footer.module.css";
import Container from "../container/Container";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.copyright}>© 2026 Stayly</div>

          <div className={styles.settings}>
            <button type="button">Русский</button>
            <button type="button">EUR €</button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
