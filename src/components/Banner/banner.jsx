import React, { useState, useEffect } from "react";
import styles from "./Bunner.module.scss";
import Button from "../button/button";
import buttonStyles from '../button/Button.module.scss';
import { auth, db } from '../../firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Modal from "../Modal/modal";

export default function Bunner() {
  const [showLogout, setShowLogout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContentType, setModalContentType] = useState("regions");
  const [selectedRegion, setSelectedRegion] = useState("Витебск");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Текущий пользователь:", currentUser);
      setUser(currentUser);
      if (currentUser) {
        const userDoc = doc(db, "usersRegion", currentUser.uid);
        try {
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            console.log("Документ пользователя найден:", userSnapshot.data());
            setSelectedRegion(userSnapshot.data().region || "Витебск");
          } else {
            console.log("Документ пользователя не найден.");
          }
        } catch (error) {
          console.error("Ошибка при получении документа пользователя:", error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleOpenModal = (type) => {
    setModalContentType(type);
    setShowModal(true);
  };

  const handleCloseModal = async (region) => {
    if (region && modalContentType === "regions") {
      setSelectedRegion(region);
      if (user) {
        const userDoc = doc(db, "usersRegion", user.uid);
        try {
          await setDoc(userDoc, { region: region }, { merge: true });
          console.log("Регион успешно сохранен в Firestore.");
        } catch (error) {
          console.error("Ошибка при сохранении региона в Firestore:", error);
        }
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
          {!user ? (
            <Button className={buttonStyles.buttonLog} text="Войти" onClick={() => handleOpenModal("registration")} />
          ) : (
            <div className={styles.profileSection}>
              <img
                className={styles.profilePicture}
                src="https://th.bing.com/th/id/OIP.Os3dloCTc-JUqOagtZOXVAHaHr?w=198&h=205&c=7&r=0&o=5&pid=1.7" alt="Profile"
                onClick={handleProfileClick}
              />
              {showLogout && (
                <Button className={buttonStyles.ButtonSwap} text="Выйти" onClick={() => signOut(auth)} />
              )}
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
