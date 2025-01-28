import React, { useState } from "react";
import styles from "./List.module.scss";
import Button from "../button/button";
import Styles from '../button/Button.module.scss'
import { SlArrowDown } from "react-icons/sl";

export default function List({ toggleBasket }) { // Передаем функцию toggleBasket как пропс
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.list}>
      <ul>
        <li><a>Новинки</a></li>
        <li><a>Раскатали цены</a></li>
        <li><a>Сытные пиццы</a></li>
        <li><a>Пиццы</a></li>
        <li><a>Комбо</a></li>
        <li><a>Закуски</a></li>
        <li><a>Завтраки</a></li>
        <li><a>Коктейли</a></li>
        <li><a>Кофе</a></li>
        <li>
          <div className={styles.dropdownWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={styles.other}>
              Ещё <SlArrowDown />
            </div>
            <ul className={`${styles.dropdownList} ${isOpen ? styles.visible : ""}`}>
              <li><a>Напитки</a></li>
              <li><a>Десерты</a></li>
              <li><a>Соусы</a></li>
              <li><a>Другие товары</a></li>
              <li><a>Хиты</a></li>
              <li><a>На компанию</a></li>
              <li><a>Любят дети</a></li>
            </ul>
          </div>
        </li>
        <li><a>Акции</a></li>
        <div className={styles.ButtonBasket}>
          <Button className={Styles.buttonBasket} text="Корзина" onClick={toggleBasket} /> 
        </div>
      </ul>
    </div>
  );
}
