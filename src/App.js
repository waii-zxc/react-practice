import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Banner from './components/Banner/banner';
import List from './components/navbar/navbar';
import Cards from './components/Cards';
import Basket from './components/Basket/index';
import Modal from './components/Modal/modal';
import styles from './components/Cards/Card.module.scss';
import RegistrationForm from './components/Forms/RegistrationForm';
import AuthorizationForm from './components/Forms/AuthorizationForm';
import AdminPage from './components/pages/adminpage/adminPage';
import AboutUs from './components/pages/aboutUs/AboutUs';
import NoGloves from './components/pages/noGloves/noGloves';
import Contacts from './components/pages/contacts/contact';
import ProductContent from './components/Modal/modalСompanents/productContent';



const MainContent = ({ handleCardClick, toggleBasket, modalActive, modalContentType, setModalActive, modalContent, isBasketOpen, handleOpenModal }) => (
  <>
    <Banner onOpenModal={handleOpenModal} />
    <List toggleBasket={toggleBasket} />
    <div className={styles.pizzaCardContainer}>
      <Cards onClick={handleCardClick} />
    </div>
    <Basket isOpen={isBasketOpen} closeBasket={toggleBasket} />
    <Modal
      active={modalActive}
      closeModal={() => setModalActive(false)}
      contentType={modalContentType}
      content={modalContent}
    >
      {modalContentType === 'custom' && (
        <ProductContent
          content={modalContent}
          handleAddToBasket={(item) => console.log('Добавлено в корзину:', item)}
        />
      )}
    </Modal>
  </>
);

const App = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({ id: '', image: '', name: '', description: '', price: 0, typeSettingVisible: false });
  const [modalContentType, setModalContentType] = useState('');

  const toggleBasket = () => setIsBasketOpen(!isBasketOpen);

  const handleCardClick = (card) => {
    setModalContent(card);
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainContent
              handleCardClick={handleCardClick}
              toggleBasket={toggleBasket}
              modalActive={modalActive}
              modalContentType={modalContentType}
              setModalActive={setModalActive}
              modalContent={modalContent}
              isBasketOpen={isBasketOpen}
              handleOpenModal={handleOpenModal}
            />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="login" element={<AuthorizationForm />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="noGloves" element={<NoGloves />} />
            <Route path="contact" element={<Contacts />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
