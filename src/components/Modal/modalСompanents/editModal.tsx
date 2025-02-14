import React, { useState } from 'react';
// import styles from './editModal.module.scss';

const EditModal = ({ card, onClose, onSave }) => {
  const [image, setImage] = useState(card.image);
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [price, setPrice] = useState(card.price);
  const [category, setCategory] = useState(card.category);

  const handleSave = () => {
    const updatedCard = {
      ...card,
      image,
      name,
      description,
      price,
      category
    };
    onSave(updatedCard);
  };

  return (
    <div className={styles.modal}>
      <h2>Редактировать карту</h2>
      <label>
        Изображение:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <label>
        Название:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Описание:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Цена:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Категория:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
};

export default EditModal;
