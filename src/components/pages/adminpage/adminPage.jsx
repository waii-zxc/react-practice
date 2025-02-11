import React, { useState, useEffect } from 'react';
import styles from './admin.module.scss';
import Banner from '../../Banner/banner';
import { collection, getDocs, query, doc, updateDoc, setDoc, deleteField, deleteDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import Button from '../../button/button';

const AdminPage = ({ handleOpenModal }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedCard, setEditedCard] = useState({});
  const [newCard, setNewCard] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  useEffect(() => {
    const loadCategoriesAndCards = async () => {
      const q = query(collection(db, "maps"));
      const querySnapshot = await getDocs(q);
      const fetchedCategories = new Set();
      const fetchedCards = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category;
        if (category) {
          fetchedCategories.add(category);
          Object.keys(data).forEach(key => {
            if (key !== "category") {
              const cardWithId = {
                id: `${doc.id}-${key}`, 
                category: category,
                ...data[key]
              };
              fetchedCards.push(cardWithId);
            }
          });
        }
      });

      console.log('Собранные категории:', Array.from(fetchedCategories));
      console.log('Карты с ID:', fetchedCards);
      setCategories([...fetchedCategories]);
      setCards(fetchedCards); 
    };
    loadCategoriesAndCards();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleEdit = (card) => {
    setEditingCardId(card.id);
    setEditedCard(card);
  };

  const handleSave = async (updatedCard) => {
    try {
      setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
      setEditingCardId(null);

      const [docId, fieldKey] = updatedCard.id.split('-');
      const cardRef = doc(db, "maps", docId);
      await updateDoc(cardRef, {
        [`${fieldKey}.name`]: updatedCard.name,
        [`${fieldKey}.description`]: updatedCard.description,
        [`${fieldKey}.price`]: updatedCard.price,
        [`${fieldKey}.image`]: updatedCard.image
      });

      console.log("Карточка успешно обновлена в Firestore.");
    } catch (e) {
      console.error("Ошибка при обновлении карточки в Firestore: ", e);
    }
  };
 

  const handleDelete = async (card) => {
    try {
      const [docId, fieldKey] = card.id.split('-');
      const cardRef = doc(db, "maps", docId);
      await updateDoc(cardRef, {
        [fieldKey]: deleteField()
      });

      setCards(cards.filter((c) => c.id !== card.id));
      console.log("Карточка успешно удалена из Firestore.");
    } catch (e) {
      console.error("Ошибка при удалении карточки из Firestore: ", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCard({ ...editedCard, [name]: value });
  };

  const handleNewCardInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddNewCard = async () => {
    if (newCard.category && newCard.name) {
      const cardKey = newCard.name.toLowerCase().replace(/\s+/g, '_');
      try {
        const categoryDocRef = doc(db, "maps", newCard.category);
        await updateDoc(categoryDocRef, {
          [cardKey]: {
            name: newCard.name,
            description: newCard.description,
            price: newCard.price,
            image: newCard.image,
          }
        });
  
        setCards([...cards, { id: `${newCard.category}-${cardKey}`, ...newCard }]);
        console.log("Новая карточка успешно добавлена в Firestore.");
        setNewCard({ name: '', description: '', price: '', image: '', category: '' });
      } catch (e) {
        console.error("Ошибка при добавлении новой карточки в Firestore: ", e);
      }
    } else {
      console.error("Ошибка: не все поля заполнены.");
    }
  };
  

  const handleAddNewCategory = async () => {
    if (newCategory) {
      try {
        const categoryDocRef = doc(db, "maps", newCategory);
        await setDoc(categoryDocRef, {
          category: newCategory
        });
  
        setCategories([...categories, newCategory]);
        console.log(`Новая категория "${newCategory}" успешно добавлена в Firestore.`);
        setNewCategory('');
      } catch (e) {
        console.error("Ошибка при добавлении новой категории в Firestore: ", e);
      }
    } else {
      console.error("Ошибка: название категории не может быть пустым.");
    }
  }


  
  const handleDeleteCategory = async (category) => {
    if (!category) {
      console.error("Ошибка: выберите категорию для удаления.");
      return;
    }

    try {
      const q = query(collection(db, "maps"), where("category", "==", category));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      setCategories(categories.filter((c) => c !== category));
      setCards(cards.filter((card) => card.category !== category));
  
      console.log(`Категория "${category}" успешно удалена из Firestore.`);
    } catch (e) {
      console.error("Ошибка при удалении категории из Firestore: ", e);
    }
  };

  return (
    <>
      <Banner onOpenModal={handleOpenModal} />
      <div className={styles.adminPage}>
        <h1>Страница админа</h1>
        <h2>Добро пожаловать в панель админа!</h2>
        <p>Здесь вы можете создавать, изменять и удалять товары</p>

        <label htmlFor="category-select">Выберите категорию:</label>
        <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Выберите категорию</option>
        {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
         ))}
        </select>
        <Button onClick={() => handleDeleteCategory(selectedCategory)} text="Удалить категорию" className="ButtonAccept" />


        <div className={styles.cardGrid}>
          {selectedCategory && (
            cards.filter(card => card.category === selectedCategory).map((card) => (
              <div key={card.id} className={styles.card}>
                {editingCardId === card.id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editedCard.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="description"
                      value={editedCard.description}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="price"
                      value={editedCard.price}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="image"
                      value={editedCard.image}
                      onChange={handleInputChange}
                    />
                    <Button onClick={() => handleSave(editedCard)} text="сохранить" />
                  </>
                ) : (
                  <>
                    <img src={card.image} alt={card.name} />
                    <h3>{card.name}</h3>
                    <p>{card.description}</p>
                    <div className={styles.bottomCont}>
                      <p className={styles.price}>{card.price} Руб</p>
                      <div className={styles.buttons}>
                        <Button onClick={() => handleEdit(card)} text="Редактировать" className='buttonChoose'/>
                        <Button onClick={() => handleDelete(card)} text="Удалить" className='buttonChoose'/>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        <div className={styles.newCardForm}>
          <h2>Добавить новую карту</h2>
          <input
            type="text"
            name="name"
            placeholder="Название"
            value={newCard.name}
            onChange={handleNewCardInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Описание"
            value={newCard.description}
            onChange={handleNewCardInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Цена"
            value={newCard.price}
            onChange={handleNewCardInputChange}
          />
          <input
            type="text"
            name="image"
            placeholder="URL изображения"
            value={newCard.image}
            onChange={handleNewCardInputChange}
          />
          <select name="category" value={newCard.category} onChange={handleNewCardInputChange}>
            <option value="">Выберите категорию</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))} 
          </select>
          <Button onClick={handleAddNewCard} text='Добавить карту' className='ButtonAccept' />
        </div>

        <div className={styles.newCategoryForm}>
          <h2>Добавить новую категорию</h2>
          <input
            type="text"
            name="newCategory"
            placeholder="Название категории"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button onClick={handleAddNewCategory} text='Добавить категорию' className='ButtonAccept' />
        </div>
      </div>
    </>
  );
};

export default AdminPage