import styles from './FlagIcon.module.css';

const FlagIcon = ({ src, size = 24 }) => (
  <img
    src={`${process.env.PUBLIC_URL}${src}`}
    alt=""
    width={size}
    height={size}
    className={styles.flag}
  />
);

export default FlagIcon;
