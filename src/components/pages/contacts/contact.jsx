import React from 'react';
import styles from './index.module.scss';
import Banner from '../../Banner/banner';
import RegionBasedContent from '../../RegionBasedContent/regionBasedContent';

const Contacts: React.FC = () => {
  return (
    <>
      <Banner />  
      <div className={styles.contacts}>
        <h1>Контакты</h1>
        <div className={styles.contactInfo}>
          {/* <h2>Наши контакты</h2>
          <p>Адрес: г. Минск, ул. Примерная, д. 1</p>
          <p>Телефон: +375 (29) 123-45-67</p>
          <p>Email: info@example.com</p> */}
          <RegionBasedContent />
        </div>
      </div>
    </>
  );
};

export default Contacts;
