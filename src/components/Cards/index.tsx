import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
  typeSettingVisible: boolean;
  onClick: (card: CardItemProps) => void;
}

const CardItem: React.FC<CardItemProps> = ({ id, image, name, description, price, category, typeSettingVisible, onClick }) => {
  return (
    <div key={id} className={styles.pizzaCard}>
      <img className={styles.pizzaPreview} src={image} alt={name} />
      <span className={styles.pizzaTitle}>{name}</span>
      <span className={styles.pizzaDescription}>{description}</span>
      <div className={styles.pizzaAddContainer}>
        <span className={styles.pizzaPrice}>от {price} руб.</span>
        <Button
          className="buttonChoose"
          onClick={() => onClick({ id, image, name, description, price, category, typeSettingVisible })}
          text="Выбрать"
        />
      </div>
    </div>
  );
};

const categoryOrder = ["новинки", "Сытные пиццы", "Пиццы", "Комбо", "Закуски", "Завтраки", "Коктейли", "Кофе", "Напитки"];

interface CardSectionProps {
  title: string;
  cards: CardItemProps[];
  onClick: (card: CardItemProps) => void;
}

const CardSection: React.FC<CardSectionProps> = ({ title, cards, onClick }) => {
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

export const Cards: React.FC<{ selectedCategory?: string, onClick: (card: CardItemProps) => void }> = ({ selectedCategory, onClick }) => {
  const [cards, setCards] = useState<CardItemProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCardsAndCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "maps"));
        const fetchedCategories = new Set<string>();
        const fetchedCards = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as any;
          const category = data.category;
          if (category) {
            fetchedCategories.add(category);
          }
          Object.keys(data).forEach((key) => {
            if (key !== 'category') {
              const product = data[key];
              fetchedCards.push({ id: doc.id + "-" + key, category, ...product });
            }
          });
        });

        let categoriesArray = Array.from(fetchedCategories).sort((a, b) => {
          const indexA = categoryOrder.indexOf(a);
          const indexB = categoryOrder.indexOf(b);
          if (indexA === -1) return 1; 
          if (indexB === -1) return -1; 
          return indexA - indexB;
        });

        setCategories(categoriesArray);
        setCards(fetchedCards);
      } catch (error) {
        console.error("Ошибка при загрузке категорий и карт из Firestore: ", error);
      }
    };

    loadCardsAndCategories();
  }, [selectedCategory]);

  return (
    <>
      {selectedCategory ? (
        <CardSection title={selectedCategory} cards={cards.filter(card => card.category === selectedCategory)} onClick={onClick} />
      ) : (
        <>
          {categories.map(category => (
            <CardSection key={category} title={category} cards={cards.filter(card => card.category === category)} onClick={onClick} />
          ))}
        </>
      )}
    </>
  );
};

export default Cards;
