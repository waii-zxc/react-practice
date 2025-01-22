import React from "react";
import styles from "./Bunner.module.scss"


export default function Bunner(){
    return(
        <div className={styles.bunner}>
       
            <div>
            <img className={styles.size} src="https://animal-park.by/dodo.png" alt="Description of the image" />
            </div>
            <div>
              <span className={styles.txt}>Доставка пиццы</span>
              <a>zxc</a>
            </div>
        </div>

 
    );
}
