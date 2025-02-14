import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Button from '../button/button';
import InputField from '../inputs/inputField';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const AuthorizationForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.email));
        if (userDoc.exists()) {
          const isAdmin = userDoc.data().admin || false;

          if (isAdmin) {
            toast.info('Вы являетесь администратором.');
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Авторизация успешна!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      toast.error(`Ошибка авторизации: ${error.message}`);
      console.error('Error', error);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Введите email для сброса пароля');
      toast.error('Введите email для сброса пароля');
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', email));
      if (!userDoc.exists()) {
        setError('Пользователь с таким email не существует');
        toast.error('Пользователь с таким email не существует');
        return;
      }

      await sendPasswordResetEmail(auth, email);
      toast.success('Письмо для сброса пароля отправлено на ваш email');
    } catch (error) {
      setError(`Ошибка при сбросе пароля: ${error.message}`);
      toast.error(`Ошибка при сбросе пароля: ${error.message}`);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>Авторизация</h2>
      <form className={styles.authorizationForm} onSubmit={handleLogin}>
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
        {/* {error && <p className={styles.error}>{error}</p>} */}
        <Button className="ButtonReg" type="submit" text="Войти" />
        <Button className="ButtonSwap" text="Забыли пароль?" onClick={handlePasswordReset} />
      </form>
    </div>
  );
};

AuthorizationForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default AuthorizationForm;
