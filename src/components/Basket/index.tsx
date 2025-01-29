import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { clearBasketInFirestore, getBasketFromFirestore } from '../../firebase';
import Button from '../button/button';
import Styles from '../button/Button.module.scss'

const Basket = ({ isOpen, closeBasket, initialItems = [] }) => {
  const [basketItems, setBasketItems] = useState(initialItems);

  useEffect(() => {
    if (isOpen) {
      const fetchBasket = async () => {
        const fetchedItems = await getBasketFromFirestore();
        console.log("Данные, полученные для отображения в корзине:", fetchedItems);
        setBasketItems(fetchedItems || []);
      };
      fetchBasket();
    }
  }, [isOpen]);


  // useEffect(() => {
  //   if (isOpen) {
  //     saveBasketToFirestore(basketItems);
  //   }
  // }, [basketItems, isOpen]);

  const handleClearBasket = async () => {
    setBasketItems([]);
    await clearBasketInFirestore();
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={closeBasket}>
      <div className={`${styles.basket} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        <h2>Корзина</h2>
        <Button className={styles.closeButton} onClick={closeBasket} text={'×'}> </Button>
        {basketItems.length === 0 ? (
          <p>Здесь будут отображаться добавленные товары.</p>
        ) : (
          <div className={styles.basketItems}>
          <ul>
            {basketItems.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name} className={styles.basketImage} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price} Руб.</p>
                </div>
              </li>
            ))}
          </ul>
          </div>
        )}
        <Button onClick={handleClearBasket} className={Styles.clearButton} text={'Очистить'}> </Button>
      </div>
    </div>
  );
};

export default Basket;
