import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { translations } from '../../constants/translations';

import styles from './NotFound.module.css';

const NotFound = () => {
  const language = useSelector((state) => state.settings.language);

  const text = translations[language].notFound;

  return (
    <main className={styles.notFound}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>

        <h1 className={styles.title}>{text.title}</h1>

        <p className={styles.text}>{text.message}</p>

        <Link className={styles.link} to="/">
          {text.link}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
