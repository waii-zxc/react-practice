import React from "react";
import styles from "./Button.module.scss";

export default function ButtonAcceptPizza({ onClick }) {
  return (
    <button className={styles.ButtonAcceptPizza} onClick={onClick}>
     В корзину за {pizza.price}
    </button>
  );
}
