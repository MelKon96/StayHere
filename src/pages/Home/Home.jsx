import { useSelector } from "react-redux";

import { translations } from "../../constants/translations";

import styles from "./Home.module.css";

const Home = () => {
  const language = useSelector((state) => state.settings.language);

  const text = translations[language];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <span className={styles.subtitle}>{text.home.subtitle}</span>

          <h1 className={styles.title}>
            {text.home.titleLine1}
            <br />
            {text.home.titleLine2}
          </h1>

          <p className={styles.description}>{text.home.description}</p>
        </div>
      </section>

      <section className={styles.destinations}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{text.home.popularDestinations}</h2>

          <div className={styles.destinationGrid}>
            <article className={styles.destination}>
              <h3>{text.home.destinations.berlin.city}</h3>
              <p>{text.home.destinations.berlin.country}</p>
            </article>

            <article className={styles.destination}>
              <h3>{text.home.destinations.amsterdam.city}</h3>
              <p>{text.home.destinations.amsterdam.country}</p>
            </article>

            <article className={styles.destination}>
              <h3>{text.home.destinations.paris.city}</h3>
              <p>{text.home.destinations.paris.country}</p>
            </article>

            <article className={styles.destination}>
              <h3>{text.home.destinations.barcelona.city}</h3>
              <p>{text.home.destinations.barcelona.country}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{text.home.whyStayhere}</h2>

          <div className={styles.featureGrid}>
            <article className={styles.feature}>
              <h3>{text.home.features.selection.title}</h3>
              <p>{text.home.features.selection.description}</p>
            </article>

            <article className={styles.feature}>
              <h3>{text.home.features.search.title}</h3>
              <p>{text.home.features.search.description}</p>
            </article>

            <article className={styles.feature}>
              <h3>{text.home.features.booking.title}</h3>
              <p>{text.home.features.booking.description}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
