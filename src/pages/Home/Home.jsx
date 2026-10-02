import { useSelector } from "react-redux";

import { destinations } from "../../constants/destinations";
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
            {destinations.map((destination) => (
              <article key={destination.key} className={styles.destination}>
                <img src={destination.image} alt={text.home.destinations[destination.key].city} />

                <div className={styles.destinationContent}>
                  <h3>{text.home.destinations[destination.key].city}</h3>
                  <p>{text.home.destinations[destination.key].country}</p>
                </div>
              </article>
            ))}
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
