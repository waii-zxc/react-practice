import React from "react";
import styles from "./mostPopular.module.scss";
import PizzaCard from "./Pizzacard";

const MostPopularPizza = () => {
  const pizzas = [
    {
      image: "https://th.bing.com/th/id/OIP.TIo56U3ayQAS10NU7pHsMQHaHa?rs=1&pid=ImgDetMain",
      name: "Маргарита",
      price: 7.99,
    },
    {
      image: "https://img02.rl0.ru/afisha/o/www.afisha.ru/uploads/d0ab8539b562416ca65b9c0f132a5a25.jpg",
      name: "Пепперони",
      price: 22.22,
    },
    {
      image: "https://maslo.media/local/assets/img/dodo/pizza_2.png",
      name: "Вегетарианская",
      price: 13.99,
    },
    {
      image: "https://cdn-irec.r-99.com/sites/default/files/product-images/238168/qbwB861hSpkBNnu5EDLMwA.jpg",
      name: "Сырная",
      price: 15,
    },
  ];

  return (
    <section className={styles.popularPizzaSection}>
      <h2 className={styles.h2}>Часто заказывают</h2>
      <div className={styles.PizzaContainer}>
        {pizzas.map((pizza, index) => (
          <PizzaCard
            key={index}
            image={pizza.image}
            name={pizza.name}
            price={pizza.price}
          />
        ))}
      </div>
    </section>
  );
}

export default MostPopularPizza;
