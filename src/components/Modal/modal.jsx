import React from 'react';
import styles from './Modal.module.scss';
import ButtonAcceptPizza from '../button/buttonAcceptPizza';

const Modal = ({ pizza, onClose }) => (
  <div className={styles.modalBackdrop} onClick={onClose}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <span className={styles.closeButton} onClick={onClose}>&times;</span>
      <img src={pizza.image} alt={pizza.name} className={styles.modalImage} />
      <div className={styles.info}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>Цена: {pizza.price} Руб.</p>
      <ButtonAcceptPizza />
      </div>
    </div>
  </div>
);

export default Modal;
