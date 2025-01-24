import React from "react";
import styles from "./Bunner.module.scss"
import Button from "../button/button";


export default function Bunner(){
    return(
        <>
        <div className={styles.bunner}>
            <div className={styles.left}>
            <div>
            <img className={styles.logo} src="https://animal-park.by/dodo.png" alt="Pizza image" />
            </div>
            <div className={styles.sizeSection}>
              <span className={styles.txt}>Доставка пиццы</span>
              <a className={styles.city}>Витебск</a>
              <p className={styles.txt}>36 мин • 4.86 &#9733;</p>
            </div>
            <div className={styles.sizeSection}>
                <a className={styles.txt}>7576</a>
                <span className={styles.txt}>Звонок по телефону</span>
            </div>
            </div>
            <div className={styles.right}>
                <Button/>
            </div>
        </div>
        </>
    );
}


