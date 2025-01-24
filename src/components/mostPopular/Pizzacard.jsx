import React from "react";
import styles from "./Pizzacard.module.scss";

const PizzaCard = ({ image, name, price }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>от {price} Руб</p>
      </div>
    </div>
  );
};

export default PizzaCard;
