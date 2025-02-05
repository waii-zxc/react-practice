import React, { useState, useEffect } from 'react';
import styles from './Modal.module.scss';
import ModalHeader from './modalСompanents/modalHeader';
import RegionsContent from './modalСompanents/regionsContent';
import RegistrationContent from './modalСompanents/registrationContent';
import AuthorizationContent from './modalСompanents/authorizationContent';
import ProductContent from './modalСompanents/productContent';
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

const Modal: React.FC<ModalProps> = ({ active, closeModal, initialContentType, content, regions }) => {
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

  const handleAuthSuccess = () => {
    closeModal(); 
  };

  const handleRegistrationSuccess = () => {
    closeModal(); 
  };

  const renderContent = () => {
    if (contentType === 'regions' && regions) {
      return (
        <RegionsContent regions={regions} closeModal={closeModal} />
      );
    }
    if (contentType === 'registration') {
      return (
        <RegistrationContent setContentType={setContentType} handleRegistrationSuccess={handleRegistrationSuccess} />
      );
    }
    if (contentType === 'authorization') {
      return (
        <AuthorizationContent setContentType={setContentType} handleAuthSuccess={handleAuthSuccess} />
      );
    }
    if (content) {
      return (
        <ProductContent content={content} handleAddToBasket={handleAddToBasket} />
      );
    }
    return null;
  };

  return (
    <div className={`${styles.modalBackdrop} ${active ? styles.active : ''}`} onClick={() => closeModal()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <ModalHeader closeModal={closeModal} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
