import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

const TypeSetting = ({ price, onPriceChange }) => {
  const [selectedSize, setSelectedSize] = useState('25 см');
  const [currentPrice, setCurrentPrice] = useState(Number(price));
  const [selectedType, setSelectedType] = useState('Классика');

  const sizePrices = {
    '25 см': Number(price),
    '30 см': Number(price) + 5,
    '35 см': Number(price) + 10,
  };

  useEffect(() => {
    const updatedPrice = Number(sizePrices[selectedSize].toFixed(2));
    setCurrentPrice(updatedPrice);
    onPriceChange(updatedPrice);
  }, [selectedSize, sizePrices, onPriceChange]);

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  return (
    <div>
      <div className={styles['type-setting']}>
        <label className={styles['type-label']}>
          <input
            className={styles['type-input']}
            type="radio"
            name="type-radio"
            value="Классика"
            checked={selectedType === 'Классика'}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span>Классика</span>
        </label>
        <label className={styles['type-label']}>
          <input
            className={styles['type-input']}
            type="radio"
            name="type-radio"
            value="Тонкое"
            checked={selectedType === 'Тонкое'}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span>Тонкое</span>
        </label>
        <div className={styles['type-selection']}></div>
      </div>
      <div className={styles['size-input']}>
        {Object.keys(sizePrices).map((size) => (
          <label key={size}>
            <input
              className={styles['size-input']}
              type="radio"
              name="size-radio"
              value={size}
              checked={selectedSize === size}
              onChange={(e) => {
                setSelectedSize(e.target.value);
              }}
            />
            <span>{size}</span>
          </label>
        ))}
        <div className={styles['selection']}></div>
      </div>
      {/* <span className={styles.sizeSelection}>{`${selectedSize} (${formatPrice(currentPrice)} BYN)`}</span> */}
    </div>
  );
};

export default TypeSetting;
