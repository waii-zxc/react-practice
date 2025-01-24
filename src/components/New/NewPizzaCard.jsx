import React, { useState } from 'react';
import styles from './NewPizzaCard.module.scss';
import ButtonChoose from '../button/buttonChoose';
import Modal from '../Modal/modal';

const NewPizzaCard = ({ pizza }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pizzaCard}>
      <img src={pizza.image} alt={pizza.name} className={styles.pizzaCard__image} />
      <span className={styles.pizzaCard__name}>{pizza.name}</span>
      <p className={styles.pizzaCard__description}>{pizza.description}</p>
      <div className={styles.pizzaCard__footer}>
        <p className={styles.pizzaCard__price}> От {pizza.price} Руб.</p>
        <ButtonChoose onClick={handleButtonClick} />
      </div>
      {isModalOpen && <Modal pizza={pizza} onClose={handleCloseModal} />}
    </div>
  );
};

export default NewPizzaCard;
