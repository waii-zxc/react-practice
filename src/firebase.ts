import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAk1kdgz1yodHjYh3Hmrl5CeuooqaMRDkI",
    authDomain: "pizza-2f515.firebaseapp.com",
    projectId: "pizza-2f515",
    storageBucket: "pizza-2f515.firebasestorage.app",
    messagingSenderId: "334558837164",
    appId: "1:334558837164:web:64651c3b530a81339c2209",
    measurementId: "G-QF5MSMCKDJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const saveBasketToFirestore = async (items) => {
  const user = auth.currentUser;
  
  if (user) {
    try {
      console.log("Сохраняем данные корзины для пользователя:", user.uid);
      console.log("Сохраняемые данные:", items);
      await setDoc(doc(db, "baskets", user.uid), {
        items: items
      });
      console.log("Корзина успешно сохранена в Firestore.");
    } catch (e) {
      console.error("Ошибка при сохранении корзины в Firestore: ", e);
    }
  } else {
    console.error("Пользователь не авторизован.");
  }
};


const clearBasketInFirestore = async () => {
    try {
        await updateDoc(doc(db, "baskets", "userBasket"), {
            items: deleteField()
        });
    } catch (e) {
        console.error("Error clearing basket in Firestore: ", e);
    }
};

const getBasketFromFirestore = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      console.log("Получаем данные корзины для пользователя:", user.uid);
      const docSnap = await getDoc(doc(db, "baskets", user.uid));
      if (docSnap.exists()) {
        console.log("Полученные данные корзины:", docSnap.data().items);
        return docSnap.data().items || [];
      } else {
        console.log("Документ не найден.");
        return [];
      }
    } catch (e) {
      console.error("Ошибка при получении корзины из Firestore: ", e);
    }
  } else {
    console.error("Пользователь не авторизован.");
  }
};


export { auth, db, saveBasketToFirestore, clearBasketInFirestore, getBasketFromFirestore };
