import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from './Card.module.scss';
import Button from '../button/button';
import { db } from '../../firebase';

interface CardItemProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  onClick: (image: string, name: string, description: string, price: number, category: string) => void;
}

const CardItem: React.FC<CardItemProps> = ({ id, image, name, description, price, category, onClick }) => {
  return (
    <div key={id} className={styles.pizzaCard}>
      <img className={styles.pizzaPreview} src={image} alt={name} />
      <span className={styles.pizzaTitle}>{name}</span>
      <span className={styles.pizzaDescription}>{description}</span>
      <div className={styles.pizzaAddContainer}>
        <span className={styles.pizzaPrice}>от {price} руб.</span>
        <Button
          className="buttonChoose"
          onClick={() => onClick(image, name, description, price, category)}
          text="Выбрать"
        />
      </div>
    </div>
  );
};

const fetchCardsByCategory = async (category: string): Promise<CardItemProps[]> => {
  try {
    console.log(`Начинаем получение данных из Firestore для категории: ${category}...`);
    const q = query(collection(db, "maps"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    const fetchedCards: CardItemProps[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;
      Object.keys(data).forEach((key) => {
        if (key !== 'category') { 
          const product = data[key];
          fetchedCards.push({ id: doc.id + "_" + key, category, ...product });
        }
      });
    });
    return fetchedCards;
  } catch (error) {
    console.error(`Ошибка при получении данных из Firestore для категории ${category}:`, error);
    return [];
  }
};

const sortCardsByName = (cards: CardItemProps[]): CardItemProps[] => {
  return cards.sort((a, b) => a.name.localeCompare(b.name));
};

interface CardSectionProps {
  title: string;
  cards: CardItemProps[];
  onClick: (image: string, name: string, description: string, price: number, category: string) => void;
}

const CardSection: React.FC<CardSectionProps> = ({ title, cards, onClick }) => {
  if (!title) {
    return null;
  }

  return (
    <>
      <h2 id={title.toLowerCase().replace(/\s+/g, '-')} className={styles.section_title}>{title}</h2>
      <div className={styles.cardContainer}>
        {cards.map(card => (
          <CardItem key={card.id} {...card} onClick={onClick} />
        ))}
      </div>
    </>
  );
};

export const Cards: React.FC<{ selectedCategory?: string, onClick: (image: string, name: string, description: string, price: number, category: string) => void }> = ({ selectedCategory, onClick }) => {
  const [cards, setCards] = useState<CardItemProps[]>([]);

  useEffect(() => {
    const loadCards = async () => {
      let fetchedCards = [];
      if (selectedCategory) {
        fetchedCards = await fetchCardsByCategory(selectedCategory);
      } else {
        const [newCardsData, discountedCardsData, coffeeCardsData, comboCardsData] = await Promise.all([
          fetchCardsByCategory("новинки"),
          fetchCardsByCategory("Сытные пиццы"),
          fetchCardsByCategory("Кофе"),
          fetchCardsByCategory("Комбо"),
        ]);
        fetchedCards = [
          ...newCardsData,
          ...discountedCardsData,
          ...coffeeCardsData,
          ...comboCardsData,
        ];
      }
      setCards(sortCardsByName(fetchedCards));
    };

    loadCards();
  }, [selectedCategory]);

  return (
    <>
      {selectedCategory ? (
        <CardSection title={selectedCategory} cards={cards} onClick={onClick} />
      ) : (
        <>
          <CardSection title="Новинки" cards={cards.filter(card => card.category === "новинки")} onClick={onClick} />
          <CardSection title="Сытные пиццы" cards={cards.filter(card => card.category === "Сытные пиццы")} onClick={onClick} />
          <CardSection title="Комбо" cards={cards.filter(card => card.category === "Комбо")} onClick={onClick} />
          <CardSection title="Кофе" cards={cards.filter(card => card.category === "Кофе")} onClick={onClick} />
        </>
      )}
    </>
  );
};

export default Cards;
