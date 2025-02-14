import React, { useState } from 'react';
import styles from './index.module.scss';
import Button from '../button/button';
import InputField from '../inputs/inputField';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = ({ onSuccess, region }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      toast.error('Пароли не совпадают');
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError('Пользователь с таким email уже существует');
        toast.error('Пользователь с таким email уже существует');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', email), {
        uid: user.uid,
        email: user.email,
        region: region || 'Витебск',
        createdAt: new Date(),
        admin: false
      });

      console.log('Уведомление об успешной регистрации отправлено');
      setMessage('Регистрация успешна!');
      toast.success('Регистрация успешна!');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      toast.error(`Ошибка при регистрации: ${error.message}`);
      console.error('Ошибка при регистрации', error);
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
        <InputField
          id="confirmPassword"
          label="Повторите пароль"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      
        <Button className="ButtonReg" type="submit" text="Зарегистрироваться" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
