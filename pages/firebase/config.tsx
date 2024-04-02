import { cartConverter } from "@/model/cart";
import { ListProduct, Product, productConverter } from "@/model/product";
import { initializeApp } from "firebase/app";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATnmpP4jkLiXKx1PvknQvW992tBDGD6IU",
  authDomain: "caijdodb.firebaseapp.com",
  projectId: "caijdodb",
  storageBucket: "caijdodb.appspot.com",
  messagingSenderId: "556827412764",
  appId: "1:556827412764:web:c0b1c4de752f91f9a592d9",
  measurementId: "G-3YRPCJR6LV",
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

export const getProductData = async () => {
  let productListRef = collection(db, "products").withConverter(
    productConverter
  );
  let productList = await getDocs(productListRef);
  let productListData = productList.docs.map((doc) => doc.data());
  return productListData;
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
export const get1ProductData = async () => {
  let cartListRef = collection(
    db,
    "users/cwLswy3CVB3YQ5z9tFiy/cart"
  ).withConverter(cartConverter);
  let cartList = await getDocs(cartListRef);
  let cartListData = cartList.docs.map((doc) => doc.data());
  return cartListData;
};

export const getDetailProduct = async (id: string): Promise<Product> => {
  let productRef = doc(db, "products", id).withConverter(productConverter);
  let productData = await getDoc(productRef);

  // Trích xuất dữ liệu từ document và chuyển đổi sang kiểu Product
  if (productData.exists()) {
    const data = productData.data();
    return new Product(
      data.id,
      data.name,
      data.description,
      data.price,
      data.offer,
      data.technical,
      data.image
    );
  } else {
    throw new Error("Product not found"); // Xử lý trường hợp không tìm thấy sản phẩm
  }
};
export const addToCart = async (props: { product: Product }) => {
  console.log("Đọc được tới đây");
  try {
    const priceAsNumber = parseInt(props.product.price.toString());
    const productRef = doc(db, "products", props.product.id); // Tạo reference đến document của product
    await addDoc(collection(db, "users/cwLswy3CVB3YQ5z9tFiy/cart"), {
      product_id: productRef, // Sử dụng reference thay vì string
      quantity: 1,
      price: priceAsNumber,
    });
    console.log("item added into cart successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};
