import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Button from '../button/button';
import buttonStyles from '../button/Button.module.scss';
import { auth } from '../../firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const AuthorizationForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Авторизация успешна!');
      if (onSuccess) {
        onSuccess(); 
      }
    } catch (error) {
      setError(error.message);
      console.error('Error', error);
    }
  };

  

  if (user) {
    return null;
  }

  return (
    <div className={styles.authForm}>
      <h2>Авторизация</h2>
      <form className={styles.authorizationForm} onSubmit={handleLogin}>
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
        {error && <p className={styles.error}>{error}</p>}
        <Button className={buttonStyles.ButtonReg} type="submit" text="Войти" />
      </form>
    </div>
  );
};

export default AuthorizationForm;
