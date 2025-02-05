import React from 'react';
import styles from '../Modal.module.scss';

interface ModalHeaderProps {
  closeModal: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ closeModal }) => {
  return (
    <span className={styles.closeButton} onClick={closeModal}>&times;</span>
  );
};

export default ModalHeader;
