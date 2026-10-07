import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.copyright}>© 2026 Stayhere</div>
      </div>
    </footer>
  );
};

export default Footer;
