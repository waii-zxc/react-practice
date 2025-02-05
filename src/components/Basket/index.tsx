import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { fetchBasketItems, clearBasket, removeItem } from '../store/Slicer/basketSlice';
import Button from '../button/button';
import { RootState, AppDispatch } from '../store';

const Basket = ({ isOpen, closeBasket }) => {
  const dispatch = useDispatch<AppDispatch>();
  const basketItems = useSelector((state: RootState) => state.basket.items);
  
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchBasketItems());
    }
  }, [dispatch, isOpen]);
  
  useEffect(() => {
    console.log('Redux работает: Элементы корзины:', basketItems);
  }, [basketItems]);
  
  // useEffect(() => {
  //   console.log('IDs of basket items:', basketItems.map(item => item.id));
  // }, [basketItems]);
  
  const handleClearBasket = () => {
    dispatch(clearBasket());
  };
  
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };
  
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={closeBasket}>
      <div className={`${styles.basket} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
        <h2>Корзина</h2>
        <Button className="closeButton" onClick={closeBasket} text="x" />
        {basketItems.length === 0 ? (
          <p>Здесь будут отображаться добавленные товары.</p>
        ) : (
          <div className={styles.basketItems}>
          <div className={styles.content}>
            {basketItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.basketImage} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price} Руб.</p>
                </div>
                <Button onClick={() => handleRemoveItem(item.id)} text="Удалить" className="deleteCard" />
              </div>
            ))}
          </div>
        </div>
        )}
        <Button onClick={handleClearBasket} className="clearButton" text="Очистить" />
      </div>
    </div>
  );
};

Basket.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeBasket: PropTypes.func.isRequired,
};
  
  export default Basket;
  