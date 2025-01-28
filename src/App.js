import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/index';
import Bunner from './components/Banner/banner';
import List from './components/list/list';
import Cards from './components/PizzaCard';
import Basket from './components/Basket/index';
import Modal from './components/Modal/modal';
import styles from './components/PizzaCard/Card.module.scss';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import AuthorizationForm from './components/registrationForm/AuthorizationForm';


function App() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({ image: '', name: '', description: '', price: 0 });
  const [modalContentType, setModalContentType] = useState('');

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
    setModalActive(false);
  };

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
          <Bunner onOpenModal={handleOpenModal} />
          <List toggleBasket={toggleBasket} />
          <div className={styles.pizzaCardContainer}>
            <Cards onClick={handleCardClick} />
          </div>
          <Basket isOpen={isBasketOpen} closeBasket={toggleBasket} items={basketItems} />
          <Modal
            active={modalActive}
            closeModal={() => setModalActive(false)}
            contentType={modalContentType}
            content={modalContent}
            onAddToCart={addToBasket}
          />
          <div className={styles.right}>
          </div>
        </Layout>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<AuthorizationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
