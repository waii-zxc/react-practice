import React from 'react';
import styles from '../PizzaCard/Card.module.scss';
import Button from '../button/button';

interface CardItemProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  onClick: (image: string, name: string, description: string, price: number) => void;
}

const CardItem: React.FC<CardItemProps> = ({ id, image, name, description, price, onClick }) => {
  return (
    <div key={id} className={styles.pizzaCard}>
      <img className={styles.pizzaPrewie} src={image} alt={name} />
      <span className={styles.pizzaTitle}>{name}</span>
      <span className={styles.pizzaDescription}>{description}</span>
      <div className={styles.pizzaAddContainer}>
        <span className={styles.pizzaPrice}>от {price} руб.</span>
        <Button
          className="buttonChoose"
          onClick={() => onClick(image, name, description, price)}
          text="Выбрать"
        />
      </div>
    </div>
  );
};

export default CardItem;
