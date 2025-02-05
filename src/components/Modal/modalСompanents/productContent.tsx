import React from 'react';
import Button from '../../button/button';
import styles from '../Modal.module.scss';

interface ProductContentProps {
  content: {
    image: string;
    name: string;
    description: string;
    price: number;
  };
  handleAddToBasket: () => void;
}

const ProductContent: React.FC<ProductContentProps> = ({ content, handleAddToBasket }) => {
  return (
    <div>
      <img src={content.image} alt={content.name} className={styles.modalImage} />
      <div className={styles.info}>
        <h2>{content.name}</h2>
        <p>{content.description}</p>
        <Button 
          className="ButtonAcceptPizza" 
          text={`В корзину за ${content.price} руб.`} 
          onClick={handleAddToBasket} 
        />
      </div>
    </div>
  );
};

export default ProductContent;
