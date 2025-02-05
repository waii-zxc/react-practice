import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/index';
import Banner from './components/Banner/banner';
import List from './components/navbar/navbar';
import Cards from './components/Cards';
import Basket from './components/Basket/index';
import Modal from './components/Modal/modal';
import styles from './components/Cards/Card.module.scss';
import RegistrationForm from './components/Forms/RegistrationForm';
import AuthorizationForm from './components/Forms/AuthorizationForm';

const App = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({ image: '', name: '', description: '', price: 0 });
  const [modalContentType, setModalContentType] = useState('');

  const toggleBasket = () => setIsBasketOpen(!isBasketOpen);

  const handleCardClick = (image, name, description, price) => {
    setModalContent({ image, name, description, price });
    setModalContentType('custom');
    setModalActive(true);
  };

  const handleOpenModal = (type) => {
    setModalContentType(type);
    setModalActive(true);
  };

  return (

    <Router>
      <div className="App">
        <Layout>
          <Banner onOpenModal={handleOpenModal} />
          <List toggleBasket={toggleBasket} />
          <div className={styles.pizzaCardContainer}>
            <Cards onClick={handleCardClick} />
          </div>
          <Basket isOpen={isBasketOpen} closeBasket={toggleBasket}  />
          <Modal
            active={modalActive}
            closeModal={() => setModalActive(false)}
            contentType={modalContentType}
            content={modalContent}
          />
          <div className={styles.right}></div>
        </Layout>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<AuthorizationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
