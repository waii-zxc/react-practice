import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerSection}>
        <h4>Пицца</h4>
        <ul>
        <li><a href="/about">О нас</a></li> 
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h4>Работа</h4>
        <ul>
          <li>В пиццерии</li>
        </ul>
      </div>
     
      <div className={styles.footerSection}>
        <h4>Это интересно</h4>
        <ul>
          <li><a href="/noGloves">Почему мы готовим без перчаток?</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
