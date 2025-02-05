import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./Banner.module.scss";
import Button from "../button/button";
import { auth, db, transferGuestBasket } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';  
import { setUser, setSelectedRegion } from '../store/Slicer/userSlice';
import Modal from "../Modal/modal";

export default function Banner() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const selectedRegion = useSelector((state) => state.user.selectedRegion);
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState("regions");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Текущий пользователь:", user);
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));

        await transferGuestBasket(uid);

        const userDoc = doc(db, "usersRegion", uid);
        try {
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            console.log("Документ пользователя найден:", userSnapshot.data());
            dispatch(setSelectedRegion(userSnapshot.data().region || "Витебск"));
          } else {
            console.log("Документ пользователя не найден. Создание документа...");
            // Создаем документ с выбранным регионом
            await setDoc(userDoc, { region: "Витебск" });
            dispatch(setSelectedRegion("Витебск"));
          }
        } catch (error) {
          console.error("Ошибка при получении или создании документа пользователя:", error);
        }
      } else {
        dispatch(setUser(null));
        console.log("Пользователь не авторизован.");
        
        // Загружаем регион для гостя из локального хранилища
        const savedRegion = localStorage.getItem("guestRegion");
        if (savedRegion) {
          dispatch(setSelectedRegion(savedRegion));
        } else {
          // Устанавливаем регион по умолчанию для гостей, если он не сохранен
          dispatch(setSelectedRegion("Витебск"));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleOpenModal = (type) => {
    console.log("Открытие модального окна для типа:", type);
    setModalContentType(type);
    setShowModal(true);
  };

  const handleCloseModal = async (region) => {
    // Добавьте проверку, чтобы избежать передачи события
    if (region && typeof region === 'string' && modalContentType === "regions") {
      dispatch(setSelectedRegion(region));
      if (currentUser) {
        const userDoc = doc(db, "usersRegion", currentUser.uid);
        try {
          await setDoc(userDoc, { region: region }, { merge: true });
          console.log("Регион успешно сохранен в Firestore.");
        } catch (error) {
          console.error("Ошибка при сохранении региона в Firestore:", error);
        }
      } else {
        // Сохраняем регион для гостя в локальное хранилище
        localStorage.setItem("guestRegion", region);
      }
    }
    setShowModal(false);
  };

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const regions = [
    { name: "Витебск" },
    { name: "Гомель" },
    { name: "Гродно" },
    { name: "Минск" },
    { name: "Могилев" },
    { name: "Брест" }
  ];

  console.log("Текущий регион:", selectedRegion);

  return (
    <>
      <div className={styles.bunner}>
        <div className={styles.left}>
          <div>
            <img className={styles.logo} src="https://animal-park.by/dodo.png" alt="Pizza" />
          </div>
          <div className={styles.sizeSection}>
            <span className={styles.txt}>Доставка пиццы</span>
            <p className={styles.city} onClick={() => handleOpenModal("regions")}>{selectedRegion}</p>
            <p className={styles.txt}>36 мин • 4.86 &#9733;</p>
          </div>
          <div className={styles.sizeSection}>
            <p className={styles.txt}>7576</p>
            <span className={styles.txt}>Звонок по телефону</span>
          </div>
        </div>
        <div className={styles.right}>
          {!currentUser ? (
            <Button className="buttonLog" text="Войти" onClick={() => handleOpenModal("registration")} />
          ) : (
            <div className={styles.profileSection}>
              <div className={styles.profilePictureWrapper}>
                <img
                  className={styles.profilePicture}
                  src="https://th.bing.com/th/id/OIP.Os3dloCTc-JUqOagtZOXVAHaHr?w=198&h=205&c=7&r=0&o=5&pid=1.7"
                  alt="Profile"
                  onClick={handleProfileClick}
                />
              </div>
              <Button className="buttonLog" text="Выйти" onClick={() => signOut(auth)} />
            </div>
          )}
        </div>
      </div>
      <Modal
        active={showModal}
        closeModal={handleCloseModal}
        initialContentType={modalContentType}
        regions={regions}
      />
    </>
  );
}
