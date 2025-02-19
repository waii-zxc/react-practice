import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/Footer';
import styles from './index.module.scss';
import { Outlet } from 'react-router-dom';
import Button from '../button/button';
import { SlArrowUp } from "react-icons/sl";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Layout = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={styles.Layout}>
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      {isVisible && (
        <Button onClick={scrollToTop} className='buttonScrollToTop'>
          <SlArrowUp />
        </Button>
      )}
      <Footer />
    </div>
  );
}

export default Layout;
