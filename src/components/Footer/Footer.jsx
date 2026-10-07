import Container from '../Container/Container';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.copyright}>© 2026 Stayhere</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
