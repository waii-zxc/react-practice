import React from 'react';
import RegistrationForm from '../../Forms/RegistrationForm';
import Button from '../../button/button';
import styles from '../Modal.module.scss';

interface RegistrationContentProps {
  setContentType: (contentType: string) => void;
  handleRegistrationSuccess: () => void;
}

const RegistrationContent: React.FC<RegistrationContentProps> = ({ setContentType, handleRegistrationSuccess }) => {
  return (
    <div>
      <RegistrationForm onSuccess={handleRegistrationSuccess} />
      <div className={styles.authLinks}>
        <Button className="ButtonSwap" onClick={() => setContentType('authorization')} text={'Авторизация'} />
      </div>
    </div>
  );
};

export default RegistrationContent;
