import React, { useState, useEffect } from 'react';
import Button from '../../button/button';
import TypeSetting from '../../radioBtn/radioButton';
import styles from '../Modal.module.scss'; // Предполагая, что файл стилей здесь
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/Slicer/basketSlice';

interface ProductContentProps {
  content: {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    typeSettingVisible: boolean;
  };
  handleAddToBasket: (item: { id: string; image: string; name: string; price: number }) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({ content, handleAddToBasket }) => {
  const dispatch = useDispatch();
  const [currentPrice, setCurrentPrice] = useState(Number(content.price));

  useEffect(() => {
    if (content.typeSettingVisible !== undefined) {
      setCurrentPrice(Number(content.price));
    }
  }, [content]);

  const formatPrice = (price: number) => {
    return Number(price.toFixed(2));
  };

  return (
    <div className={styles.productContent}>
      <img src={content.image} alt={content.name} className={styles.modalImage} />
      <div className={styles.details}>
        <div className={styles.info}>
          <h2>{content.name}</h2>
          <p>{content.description}</p>
          {/* <span className={styles.currentPrice}>{`Цена: ${formatPrice(currentPrice)} руб.`}</span> */}
        {content.typeSettingVisible && (
          <TypeSetting price={Number(content.price)} onPriceChange={(updatedPrice) => setCurrentPrice(Number(updatedPrice.toFixed(2)))} />
        )}
          <Button
            className="ButtonAccept"
            text={`В корзину за ${formatPrice(currentPrice)} руб.`}
            onClick={() => {
              console.log('Добавляем в корзину с текущей ценой:', currentPrice);
              dispatch(addItem({ id: content.id, image: content.image, name: content.name, price: formatPrice(currentPrice) }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
