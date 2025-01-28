import React, { useState } from 'react';
import styles from './index.module.scss';
import Button from '../button/button';
import buttonStyles from '../button/Button.module.scss';
import { auth } from '../../firebase' // путь к вашему файлу firebase.js
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const RegistrationForm = () => {
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
    } catch (error) {
      setError(error.message);
      console.error('Error during registration', error);
    }
  };

  return (
    <div className={styles.regForm}>
      <h2>Регистрация</h2>
      <form className={styles.registrationForm} onSubmit={handleRegistration}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <Button className={buttonStyles.ButtonReg} type="submit" text="Зарегистрироваться" />
      </form>
    </div>
  );
};

export default RegistrationForm;
