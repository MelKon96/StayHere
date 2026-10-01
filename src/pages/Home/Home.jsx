import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <span className={styles.subtitle}>Путешествуйте с комфортом</span>

          <h1 className={styles.title}>
            Найдите место,
            <br />
            где хочется остаться
          </h1>

          <p className={styles.description}>Отели и апартаменты в популярных городах Европы. Выбирайте направление, планируйте поездку и бронируйте без лишних сложностей.</p>
        </div>
      </section>

      <section className={styles.destinations}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Популярные направления</h2>

          <div className={styles.destinationGrid}>
            <article className={styles.destination}>
              <h3>Берлин</h3>
              <p>Германия</p>
            </article>

            <article className={styles.destination}>
              <h3>Амстердам</h3>
              <p>Нидерланды</p>
            </article>

            <article className={styles.destination}>
              <h3>Париж</h3>
              <p>Франция</p>
            </article>

            <article className={styles.destination}>
              <h3>Барселона</h3>
              <p>Испания</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Почему Stayly</h2>

          <div className={styles.featureGrid}>
            <article className={styles.feature}>
              <h3>Большой выбор</h3>
              <p>Отели и апартаменты для разных типов путешествий.</p>
            </article>

            <article className={styles.feature}>
              <h3>Удобный поиск</h3>
              <p>Быстро находите подходящий вариант по направлению и датам.</p>
            </article>

            <article className={styles.feature}>
              <h3>Простое бронирование</h3>
              <p>Выберите номер, даты и количество гостей в несколько шагов.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
