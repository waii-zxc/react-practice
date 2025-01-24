import React from 'react';
import PizzaCard from './NewPizzaCard';
import styles from './NewPizza.module.scss';

const pizzas = [
  { name: 'Маргарита', description: 'Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус', price: '8.99', image: 'https://media.dodostatic.net/image/r:292x292/11efa1eecbfe557d92cd312e3b438dae.avif' },
  { name: 'Пепперони', description: 'Пряная говядина , шампиньоны , грибной соус, маринованные огурчики , моцарелла, красный лук , фирменный соус альфредо', price: '9.99', image: 'https://media.dodostatic.net/image/r:292x292/11efa1f25c3e3161b43842faae8aaa36.avif' },
  { name: 'Гавайская', description: 'Ветчина, грибной соус, бекон, солёные огурчики, увеличенная порция моцареллы, красный лук, соус ранч, итальянские травы', price: '10.99', image: 'https://media.dodostatic.net/image/r:292x292/11ef6e94946efc2cbe3d38379894882e.avif' },
  { name: 'Гавайская', description: 'Ветчина, бекон, соус ранч, моцарелла, маринованные огурчики, красный лук, итальянские травы и горчичный соус', price: '10.99', image: 'https://media.dodostatic.net/image/r:292x292/11ef38541e76455f9a3150f1efda0055.avif' },
  { name: 'Гавайская', description: 'Ветчина, бекон, соус ранч, моцарелла, маринованные огурчики, красный лук, итальянские травы и горчичный соус', price: '10.99', image: 'https://media.dodostatic.net/image/r:292x292/0193f26d1825798e82ad4b41daf5c6cc.avif' },
];

const NewPizza = () => (
  <div className={styles.newPizza}>
    <h1 className={styles.title}>Новинки</h1>
    <div className={styles.cardContainer}>
      {pizzas.map((pizza, index) => (
        <PizzaCard key={index} pizza={pizza} />
      ))}
    </div>
  </div>
);

export default NewPizza;
