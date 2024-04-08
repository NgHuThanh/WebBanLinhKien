import { cartConverter } from "@/model/cart";
import { categoriesConverter } from "@/model/categories";
import { ListProduct, Product, productConverter } from "@/model/product";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZ5SZ2bS0qelHkeJBYXMQi7jUcKRbvoyw",
  authDomain: "weblinhkien-b9612.firebaseapp.com",
  projectId: "weblinhkien-b9612",
  storageBucket: "weblinhkien-b9612.appspot.com",
  messagingSenderId: "514113053206",
  appId: "1:514113053206:web:dd7546c647ddcb65facb37",
  measurementId: "G-L6ZHHGL5HV",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const writeExample = async () => {
  console.log("Đọc được tới đây");

  try {
    await addDoc(collection(db, "order_items"), {
      order_id: "/orders/thisisexample",
      product_id: "/products/thisisexample",
      quantity: "1",
      price: "thisisexample",
    });
    console.log("Order item added successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};

export const handleAddToCart = async (product: Product) => {
  console.log("Đọc được tới đây");
  try {
    await addDoc(collection(db, "order_items"), {
      order_id: "/orders/Chưa chuẩn bị",
      product_id: "/products/" + product?.id,
      quantity: "1",
      price: product?.price,
    });
    console.log("Order item added successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};

export const getCategoriesData = async () => {
  let categoriesListRef = collection(db, "categories").withConverter(
    categoriesConverter
  );
  let categoriesList = await getDocs(categoriesListRef);
  let categoriesListData = categoriesList.docs.map((doc) => doc.data());
  return categoriesListData;
};
export const getCartData = async () => {
  let cartListRef = collection(
    db,
    "users/cwLswy3CVB3YQ5z9tFiy/cart"
  ).withConverter(cartConverter);
  let cartList = await getDocs(cartListRef);
  let cartListData = cartList.docs.map((doc) => doc.data());
  return cartListData;
};
