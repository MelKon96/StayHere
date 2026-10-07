import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.notFound}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Мы не смогли найти страницу</h1>
        <p className={styles.text}>
          <br />
          Но мы обязательно найдём вам кое-что получше.
        </p>
        <Link className={styles.link} to="/">
          Найти себе место для незабываемого отдыха
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
