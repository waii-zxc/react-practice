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
  const userId = user ? user.uid : 'guest';

  try {
    const itemsWithId = items.map((item, index) => ({
      ...item,
      id: item.id || `${userId}-${index}`
    }));
    console.log("Сохраняем данные корзины для пользователя:", userId);
    console.log("Сохраняемые данные:", itemsWithId);
    
    await setDoc(doc(db, "baskets", userId), {
      items: itemsWithId,
      userId: userId 
    });
    
    console.log("Корзина успешно сохранена в Firestore.");
  } catch (e) {
    console.error("Ошибка при сохранении корзины в Firestore: ", e);
  }
};

const clearBasketInFirestore = async () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest';

  try {
    await updateDoc(doc(db, "baskets", userId), {
      items: deleteField()
    });
    console.log("Корзина успешно очищена в Firestore.");
  } catch (e) {
    console.error("Ошибка при очистке корзины в Firestore: ", e);
  }
};

const getBasketFromFirestore = async () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest';

  try {
    console.log("Получаем данные корзины для пользователя:", userId);
    
    const docSnap = await getDoc(doc(db, "baskets", userId));
    
    if (docSnap.exists()) {
      const items = docSnap.data().items || [];
      console.log("Полученные данные корзины:", items);
      return items.map((item, index) => ({
        ...item,
        id: item.id || `${userId}-${index}`
      }));
    } else {
      console.log("Документ не найден.");
      return [];
    }
  } catch (e) {
    console.error("Ошибка при получении корзины из Firestore: ", e);
  }
};

const transferGuestBasket = async (userId) => {
  try {
    const guestBasketDoc = doc(db, "baskets", "guest");
    const guestBasketSnapshot = await getDoc(guestBasketDoc);
    
    if (guestBasketSnapshot.exists()) {
      const guestItems = guestBasketSnapshot.data().items || [];
      console.log("Гостевая корзина найдена, элементы:", guestItems);

      const userBasketDoc = doc(db, "baskets", userId);
      const userBasketSnapshot = await getDoc(userBasketDoc);
      const userItems = userBasketSnapshot.exists() ? userBasketSnapshot.data().items || [] : [];

      const combinedItems = [...userItems, ...guestItems];

      await setDoc(userBasketDoc, { items: combinedItems, userId: userId }, { merge: true });
      console.log("Корзина гостя успешно добавлена к корзине пользователя:", userId);
      
      await updateDoc(guestBasketDoc, { items: deleteField() }); 
      console.log("Корзина гостя успешно очищена.");
    } else {
      console.log("Гостевая корзина не найдена.");
    }
  } catch (e) {
    console.error("Ошибка при передаче корзины гостя пользователю:", e);
  }
};

export { auth, db, saveBasketToFirestore, clearBasketInFirestore, getBasketFromFirestore, transferGuestBasket };
