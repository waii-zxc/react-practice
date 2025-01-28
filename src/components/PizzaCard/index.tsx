import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Button from '../button/button'; 
import Styles from '../button/Button.module.scss';
import styles from './Card.module.scss';
import { db } from '../../firebase';

interface Card {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
}

const fetchCards = async (): Promise<Card[]> => {
  const querySnapshot = await getDocs(collection(db, "maps"));
  const cards: Card[] = [];
  querySnapshot.forEach((doc) => {
    cards.push({ id: doc.id, ...doc.data() as Card });
  });
  return cards;
};

export default function Cards({ onClick }) {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCards();
      setCards(data); 
    };
    getData();
  }, []);

  return (
    <>
      <h2 className={styles.section_title}>Новинки</h2>
      <div className={styles.cardContainer}>
        {cards.map(card => (
          <div key={card.id} className={styles.pizzaCard}>
            <img
              className={styles.pizzaPrewie}
              src={card.image}
              alt={card.name}
            />
            <span className={styles.pizzaTitle}>{card.name}</span>
            <span className={styles.pizzaDescription}>
              {card.description}
            </span>
            <div className={styles.pizzaAddContainer}>
              <span className={styles.pizzaPrice}>от {card.price} руб.</span>
              <Button
                className={Styles.buttonChoose}
                onClick={() => onClick(card.image, card.name, card.description, card.price)}
                text="Выбрать"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
