import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h4>Додо Пицца</h4>
        <ul>
          <li>О нас</li>
          <li>Додо-книга</li>
          <li>Блог «Сила ума»</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h4>Работа</h4>
        <ul>
          <li>В пиццерии</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h4>Партнерам</h4>
        <ul>
          <li>Франшиза</li>
          <li>Инвестиции</li>
          <li>Поставщикам</li>
          <li>Предложить помещение</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h4>Это интересно</h4>
        <ul>
          <li>Почему мы готовим без перчаток?</li>
          <li>Экскурсии и мастер-классы</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
