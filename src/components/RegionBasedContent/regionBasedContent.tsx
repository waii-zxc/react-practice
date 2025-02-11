import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const RegionBasedContent = () => {
  const selectedRegion = useSelector((state) => state.user.selectedRegion);

  const renderContentByRegion = () => {
    switch (selectedRegion) {
      case 'Витебск':
        return (
          <>
            <h3 className={styles.heading}>Витебск 1</h3>
            <p className={styles.text}>ул. Чкалова, 35</p>
            <p className={styles.text}>Рейтинг: 4.84</p>
            <p className={styles.text}>Время доставки: 36 минут</p>
            <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
            <h3 className={styles.heading}>Витебск 2</h3>
            <p className={styles.text}>ул. Замковая, 21/1</p>
            <p className={styles.text}>Рейтинг: 4.85</p>
            <p className={styles.text}>Время доставки: 36 минут</p>
            <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
          </>
        );
        case 'Брест':
        return (
          <>
            <h3 className={styles.heading}>Брест 1</h3>
            <p className={styles.text}>ул. Чкалова, 35</p>
            <p className={styles.text}>Рейтинг: 4.91</p>
            <p className={styles.text}>Время доставки: 35 минут</p>
            <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 22:30</p>
            <h3 className={styles.heading}>Брест 2</h3>
            <p className={styles.text}>ул. Волгоградская, 28а</p>
            <p className={styles.text}>Рейтинг: 4.85</p>
            <p className={styles.text}>Время доставки: 35 минут</p>
            <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
          </>
        );
        case 'Гомель':
            return (
              <>
                <h3 className={styles.heading}>Гомель 1</h3>
                <p className={styles.text}>ул. Ефремова, 11</p>
                <p className={styles.text}>Рейтинг: 4.87</p>
                <p className={styles.text}>Время доставки: 35 минут</p>
                <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
                <h3 className={styles.heading}>Гомель 2</h3>
                <p className={styles.text}>ул. Советская, 2</p>
                <p className={styles.text}>Рейтинг: 4.78</p>
                <p className={styles.text}>Время доставки: 33 минут</p>
                <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
                <h3 className={styles.heading}>Гомель 3</h3>
                <p className={styles.text}>пр-т Речицкий, 5В</p>
                <p className={styles.text}>Рейтинг: 4.83</p>
                <p className={styles.text}>Время доставки: 33 минут</p>
                <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
              </>
            );
            case 'Гродно':
            return (
              <>
                <h3 className={styles.heading}>Автовокзал</h3>
                <p className={styles.text}>пр-т Космонавтов, 11</p>
                <p className={styles.text}>Рейтинг: 4.79</p>
                <p className={styles.text}>Время доставки: 40 минут</p>
                <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>

                <h3 className={styles.heading}>Евроопт</h3>
                <p className={styles.text}>пр-т Янки Купалы, 82A</p>
                <p className={styles.text}>Рейтинг: 4.91</p>
                <p className={styles.text}>Время доставки: 33 минут</p>
                <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>

                <h3 className={styles.heading}>ТРК Тринити</h3>
                <p className={styles.text}>пр-т Янки Купалы, 87</p>
                <p className={styles.text}>Рейтинг: 4.83</p>
                <p className={styles.text}>Время доставки: 30 минут</p>
                <p className={styles.text}>Часы работы (доставка/ресторан): 11:00 - 23:00</p>
              </>
            );
            case 'Минск':
  return (
    <>
      <h3 className={styles.heading}>ТЦ "Скала"</h3>
      <p className={styles.text}>ул. Петра Глебки, 5</p>
      <p className={styles.text}>38 мин • 4.85</p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 10:00 — 22:00</p>

      <h3 className={styles.heading}>Алми</h3>
      <p className={styles.text}>ул. Притыцкого, 93</p>
      <p className={styles.text}>39 мин • 4.64 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

      <h3 className={styles.heading}>Белградская</h3>
      <p className={styles.text}>ул. Белградская, 4</p>
      <p className={styles.text}>33 мин • 4.73 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

      <h3 className={styles.heading}>Богдановича "Матрёшка"</h3>
      <p className={styles.text}>ул. Максима Богдановича, 62</p>
      <p className={styles.text}>38 мин • 4.86 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

      <h3 className={styles.heading}>Волгоградская</h3>
      <p className={styles.text}>ул. Волгоградская, 4А</p>
      <p className={styles.text}>38 мин • 4.73 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

      <h3 className={styles.heading}>Гурского</h3>
      <p className={styles.text}>ул. Гурского, 56</p>
      <p className={styles.text}>34 мин • 4.76 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

      <h3 className={styles.heading}>Денисовская</h3>
      <p className={styles.text}>ул. Денисовская, 8</p>
      <p className={styles.text}>36 мин • 4.81 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

      <h3 className={styles.heading}>Лошица</h3>
      <p className={styles.text}>ул. Иосифа Гошкевича, 3</p>
      <p className={styles.text}>40 мин • 4.78 </p>
      <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 02:00</p>
      <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>
    </>
  );
  case 'Могилев':
    return (
      <>
        <h3 className={styles.heading}>Могилев 1</h3>
        <p className={styles.text}>пр-т Пушкинский, 41А</p>
        <p className={styles.text}>32 мин • 4.8</p>
        <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 23:00</p>
        <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

        <h3 className={styles.heading}>Могилев 2</h3>
        <p className={styles.text}>ул. Космонавтов, 8</p>
        <p className={styles.text}>41 мин • 4.86</p>
        <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 23:00</p>
        <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>

        <h3 className={styles.heading}>Могилев 3</h3>
        <p className={styles.text}>ул. Космонавтов, 8</p>
        <p className={styles.text}>34 мин • 4.95</p>
        <p className={styles.text}>Доставка: Пн-Вс: 11:00 — 23:00</p>
        <p className={styles.text}>Ресторан и самовывоз: Пн-Вс: 11:00 — 23:00</p>
     </>
    );
      default:
        return <p className={styles.text}>Выберите ваш регион для отображения информации.</p>;
    }
  };

  return (
    <div className={styles.regionContent}>
      <h2 className={styles.title}>Информация о ресторанах: {selectedRegion}</h2>
      {renderContentByRegion()}
    </div>
  );
};

export default RegionBasedContent;
