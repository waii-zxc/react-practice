import React from 'react';
import Header from '../header/header';
import Footer from '../footer/Footer';
import styles from './index.module.scss';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className={styles.Layout}>
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
