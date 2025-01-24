import React from "react";
import styles from "./Button.module.scss";

export default function ButtonChoose({ onClick }) {
  return (
    <button className={styles.buttonChoose} onClick={onClick}>
      Выбрать
    </button>
  );
}
