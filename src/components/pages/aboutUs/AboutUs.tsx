import React from 'react';
import styles from './index.module.scss';
import Banner from '../../Banner/banner';

const AboutUs: React.FC = () => {
  return (
    <>
      <Banner />  
    <div className={styles.aboutUs}>
      <h1>О нас</h1>
      <p className={styles.paragraph}>
        Добро пожаловать в нашу пиццерию, место, где каждый кусочек пиццы – это искусство. Наша история началась с мечты команды энтузиастов, страстно влюбленных в кулинарию. Мы хотели создать не просто ресторан, а место, где каждый сможет найти свою идеальную пиццу.
      </p>
      <p className={styles.paragraph}>
        Мы верим, что пицца – это не только еда, но и способ выразить свою индивидуальность. Каждый рецепт разработан с вниманием к деталям и с уважением к классическим традициям итальянской кухни. В нашем меню вы найдете как классические вкусы, так и авторские сочетания, созданные для тех, кто любит эксперименты.
      </p>
      <p className={styles.paragraph}>
        Наша команда состоит из профессионалов, которые ежедневно вкладывают душу в свою работу. Каждый ингредиент тщательно отбирается, чтобы обеспечить высочайшее качество и неповторимый вкус. Мы используем только свежие овощи, лучшие сорта мяса и сыра, чтобы каждая пицца радовала вас своим ароматом и вкусом.
      </p>
      <p className={styles.paragraph}>
        Наш ресторан – это уютное место, где можно провести время с друзьями, семьей или коллегами. Мы создали атмосферу, в которой каждый гость чувствует себя как дома. Наши повара готовы удовлетворить любые гастрономические предпочтения, а дружелюбный персонал всегда рад помочь с выбором блюд и напитков.
      </p>
      <p className={styles.paragraph}>
        Мы также предлагаем услугу доставки, чтобы вы могли насладиться любимой пиццей в любое время и в любом месте. Наши курьеры оперативно доставят ваш заказ, сохраняя его свежим и горячим.
      </p>
      <p className={styles.paragraph}>
        Благодарим вас за то, что выбираете нас! Мы всегда стремимся к тому, чтобы ваше посещение нашего ресторана оставляло только положительные впечатления. Приходите к нам и откройте для себя мир вкусной пиццы и теплого гостеприимства.
      </p>
    </div>
    </>
  );
};

export default AboutUs;
