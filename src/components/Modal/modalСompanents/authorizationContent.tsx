import React from 'react';
import AuthorizationForm from '../../Forms/AuthorizationForm';
import Button from '../../button/button';
import styles from '../Modal.module.scss';

interface AuthorizationContentProps {
  setContentType: (contentType: string) => void;
  handleAuthSuccess: () => void;
}

const AuthorizationContent: React.FC<AuthorizationContentProps> = ({ setContentType, handleAuthSuccess }) => {
  return (
    <div>
      <AuthorizationForm onSuccess={handleAuthSuccess} />
      <div className={styles.authLinks}>
        <Button className="ButtonSwap" onClick={() => setContentType('registration')} text={'Регистрация'} />
      </div>
    </div>
  );
};

export default AuthorizationContent;
