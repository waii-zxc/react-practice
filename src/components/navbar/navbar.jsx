import React, { useState } from "react";
import styles from "./List.module.scss";
import Button from "../button/button";
import { SlArrowDown } from "react-icons/sl";

export default function List({ toggleBasket }) { 
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
        <li><a href="#новинки">Новинки</a></li>
        {/* <li><a href="#раскатали-цены">Раскатали цены</a></li> */}
        <li><a href="#сытные-пиццы">Сытные пиццы</a></li>
        <li><a href="#пиццы">Пиццы</a></li>
        <li><a href="#комбо">Комбо</a></li>
        <li><a href="#закуски">Закуски</a></li>
        <li><a href="#завтраки">Завтраки</a></li>
        <li><a href="#коктейли">Коктейли</a></li>
        <li><a href="#кофе">Кофе</a></li>
        <li>
          <div className={styles.dropdownWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={styles.other}>
              Ещё <SlArrowDown />
            </div>
            <ul className={`${styles.dropdownList} ${isOpen ? styles.visible : ""}`}>
              <li><a href="#напитки">Напитки</a></li>
              <li><a href="#десерты">Десерты</a></li>
              <li><a href="#соусы">Соусы</a></li>
              {/* <li><a href="#другие-товары">Другие товары</a></li> */}
              {/* <li><a href="#хиты">Хиты</a></li>
              <li><a href="#на-компанию">На компанию</a></li>
              <li><a href="#любят-дети">Любят дети</a></li> */}
            </ul>
          </div>
        </li>
        <li><a href="#акции">Акции</a></li>
        <div className={styles.ButtonBasket}>
          <Button className="buttonBasket" text="Корзина" onClick={toggleBasket} /> 
        </div>
      </ul>
    </div>
  );
}
