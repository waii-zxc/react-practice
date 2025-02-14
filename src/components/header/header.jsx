import React from "react";
import styles from "./Header.module.scss"

export default function Header(){
    return(
        <>
            <header className={styles.header}>
              <nav className={styles.navMenu}>
                <ul>
                  <li><a href="#home">Прямой эфир</a></li>
                  <li><a href="/about">О нас</a></li> 
                  <li><a href="/contact">Контакты</a></li>
                </ul>
              </nav>
            </header>
            </>
    );
}
