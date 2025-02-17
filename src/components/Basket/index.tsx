import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { fetchBasketItems, clearBasket, removeItem } from '../store/Slicer/basketSlice';
import Button from '../button/button';
import { RootState, AppDispatch } from '../store';
import { toast } from 'react-toastify';

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
    basketItems.forEach(item => console.log(`Товар: ${item.name}, Цена: ${item.price}, Количество: ${item.quantity}`));
  }, [basketItems]);

  const handleClearBasket = () => {
    dispatch(clearBasket());
    toast.success('Корзина успешно очищена.');
  };

  const handleRemoveItem = (id: string, price: number) => {
    dispatch(removeItem({ id, price }));
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
                <div key={`${item.id}-${item.price}`} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.basketImage} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.price} Руб. x {item.quantity}</p>
                  </div>
                  <Button onClick={() => handleRemoveItem(item.id, item.price)} text="Удалить" className="deleteCard" />
                </div>
              ))}
            </div>
          </div>
        )}
        {basketItems.length > 0 && (
          <Button onClick={handleClearBasket} className="clearButton" text="Очистить" />
        )}
      </div>
    </div>
  );
};

Basket.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeBasket: PropTypes.func.isRequired,
};

export default Basket;
