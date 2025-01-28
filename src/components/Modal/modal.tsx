import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';
import Button from '../button/button';
import buttonStyles from '../button/Button.module.scss';
import RegistrationForm from '../registrationForm/RegistrationForm';
import AuthorizationForm from '../registrationForm/AuthorizationForm';
import { saveBasketToFirestore, getBasketFromFirestore } from '../../firebase'; 

interface ModalProps {
  active: boolean;
  closeModal: (region?: string) => void;
  initialContentType: string;
  content?: {
    image: string;
    name: string;
    description: string;
    price: number;
  };
  regions?: Array<{ image: string; name: string }>;
}

const Modal = ({ active, closeModal, initialContentType, content, regions }: ModalProps) => {
  const [contentType, setContentType] = useState(initialContentType);
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    setContentType(initialContentType);
  }, [initialContentType]);

  useEffect(() => {
    if (active) {
      const fetchBasket = async () => {
        const fetchedItems = await getBasketFromFirestore();
        setBasketItems(fetchedItems || []);
      };
      fetchBasket();
    }
  }, [active]);

  const handleAddToBasket = async () => {
    if (content) {
      const newItems = [...basketItems, content];
      setBasketItems(newItems);
      console.log("Сохраняем новые данные корзины:", newItems); 
      await saveBasketToFirestore(newItems);
    }
  };

  const renderContent = () => {
    if (contentType === 'regions' && regions) {
      return (
        <div>
          <h2>Выберите область</h2>
          <ul>
            {regions.map((region, index) => (
              <li className={styles.region} key={index} onClick={() => closeModal(region.name)}>
                {region.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    if (contentType === 'registration') {
      return (
        <div>
          <RegistrationForm />
          <div className={styles.authLinks}>
            <button className={buttonStyles.ButtonSwap} onClick={() => setContentType('authorization')}>Авторизация</button>
          </div>
        </div>
      );
    }
    if (contentType === 'authorization') {
      return (
        <div>
          <AuthorizationForm />
          <div className={styles.authLinks}>
            <button className={buttonStyles.ButtonSwap} onClick={() => setContentType('registration')}>Регистрация</button>
          </div>
        </div>
      );
    }
    if (content) {
      return (
        <div>
          <img src={content.image} alt={content.name} className={styles.modalImage} />
          <div className={styles.info}>
            <h2>{content.name}</h2>
            <p>{content.description}</p>
            <Button 
              className={buttonStyles.ButtonAcceptPizza} 
              text={`В корзину за ${content.price} руб.`} 
              onClick={handleAddToBasket} 
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${styles.modalBackdrop} ${active ? styles.active : ''}`} onClick={() => closeModal()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={() => closeModal()}>&times;</span>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
