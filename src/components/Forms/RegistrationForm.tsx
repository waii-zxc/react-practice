import React, { useState } from 'react';
import styles from './index.module.scss';
import Button from '../button/button';
import InputField from '../inputs/inputField';
import { auth } from '../../firebase'; 
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const RegistrationForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    console.log('Handle registration called');
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError('Пользователь с таким email уже существует');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      alert('Регистрация успешна!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      console.error('Error during registration', error);
    }
  };

  return (
    <div className={styles.regForm}>
      <h2>Регистрация</h2>
      <form className={styles.registrationForm} onSubmit={handleRegistration}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          id="password"
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <Button className="ButtonReg" type="submit" text="Зарегистрироваться"  />
      </form>
    </div>
  );
};

export default RegistrationForm;
