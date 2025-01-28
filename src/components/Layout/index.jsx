import React from 'react';
import Header from '../header/header';
import Footer from '../footer/Footer';
import styles from './index.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.Layout}>
      <Header />
      <main className={styles.mainContainer}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
