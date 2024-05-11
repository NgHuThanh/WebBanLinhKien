import { Cart, cartConverter } from "@/model/cart";
import { ListProduct, Product, productConverter } from "@/model/product";
import { getApp, initializeApp } from "firebase/app";
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
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
// Import thêm các dependency cần thiết

export const getProductData = async () => {
  try {
    const productListRef = collection(db, "products").withConverter(
      productConverter
    );
    const productListSnapshot = await getDocs(productListRef);
    const productListData = productListSnapshot.docs.map((doc) => doc.data());
    return productListData;
  } catch (error) {
    console.error("Error getting product data: ", error);
    throw error;
  }
};

export const addProduct = async (product: Product) => {
  try {
    const productRef = doc(collection(db, "products")).withConverter(
      productConverter
    );
    await setDoc(productRef, product, { merge: true });
    console.log("Product added successfully.");
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    console.log("Product deleted successfully.");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  newData: Partial<Product>
) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, newData);
    console.log("Product updated successfully.");
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
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

export const getCartData = async () => {
  let cartListRef = collection(
    db,
    "carts/ZSNrIXRxuZCZS6kR4DtM/cart"
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
      data.image,
      data.rating,
      data.saleinfor,
      data.idcategories
    );
  } else {
    throw new Error("Product not found"); // Xử lý trường hợp không tìm thấy sản phẩm
  }
};
export const addToCart = async (props: { product: Product }) => {
  console.log("Đọc được tới đây");
  try {
    const priceAsNumber =
      (props.product.price * (100 - props.product.saleinfor)) / 100;
    const discountAsNumber =
      (props.product.price * props.product.saleinfor) / 100;
    const productRef = doc(db, "products", props.product.id); // Tạo reference đến document của product
    await addDoc(collection(db, "carts/ZSNrIXRxuZCZS6kR4DtM/cart"), {
      product_id: productRef, // Sử dụng reference thay vì string
      quantity: 1,
    });
    console.log("item added into cart successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};

//Add random product
let currentProductNumber = 2;
export const handleAddRandomProduct = async () => {
  console.log("Đọc được tới add random product");
  try {
    const categoriesRef = doc(db, "catergories", "7raPnomvzR87TNooWlv1");
    const currentNumber = currentProductNumber++;
    await addDoc(collection(db, "products"), {
      idcategories: categoriesRef,
      image: "None",
      name: `LapTop ${currentNumber}`, // Tên sản phẩm sẽ được thay đổi dựa trên giá trị số hiện tại
      offer: `Offer LapTop ${currentNumber}`, // Thay đổi thông tin offer
      price: currentNumber, // Giá cũng sẽ thay đổi
      saleinfor: 20,
      description: `Description for LapTop ${currentNumber}`, // Thay đổi mô tả
      color: "black",
    });
    console.log("Order item added successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};

export const handleUpdateCart = async (props: {
  cart: Cart;
  quantity: number;
}) => {
  console.log("Đọc được tới đây");
  try {
    await updateDoc(doc(db, "carts/ZSNrIXRxuZCZS6kR4DtM/cart", props.cart.id), {
      quantity: props.quantity,
    });
    console.log("Order item update successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};
export const handleMarkCart = async (props: { cart: Cart; mark: Boolean }) => {
  console.log("Đọc được tới đây");
  try {
    await updateDoc(doc(db, "carts/ZSNrIXRxuZCZS6kR4DtM/cart", props.cart.id), {
      mark: props.mark,
    });
    console.log("Order item update successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};
export const handleDeleteCart = async (props: { cart: Cart }) => {
  console.log("Đọc được tới đây");
  try {
    await deleteDoc(doc(db, "carts/ZSNrIXRxuZCZS6kR4DtM/cart", props.cart.id));
    console.log("Cart item delete successfully.");
    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};

export const handleDeleteCartsToAddOrderItem = async (props: {
  carts: Cart[];
}) => {
  console.log("Đọc được tới đây");

  try {
    const userRef = doc(db, "users", "cwLswy3CVB3YQ5z9tFiy");
    // Tạo một order mới
    const orderRef = await addDoc(collection(db, "orders"), {
      state: false,
      user_id: userRef,
    });

    console.log("Order created with ID");
    props.carts.forEach(async (cart) => {
      try {
        await deleteDoc(doc(db, "carts/ZSNrIXRxuZCZS6kR4DtM/cart", cart.id));
        console.log("Cart item deleted successfully.");
        // Chuyển hướng đến trang giỏ hàng sau khi xóa thành công
      } catch (error) {
        console.error("Error deleting cart item: ", error);
      }
      try {
        const productRef = doc(db, "products", cart.id);
        const currentNumber = currentProductNumber++;
        let productRefer = cart.product_id.withConverter(productConverter);
        let productData = await getDoc(productRefer);
        await addDoc(collection(orderRef, "order_details"), {
          product_id: productRef,
          quantity: cart.quantity,
          price:
            (((productData.data()?.price as number) -
              (productData.data()?.saleinfor as number)) /
              100) *
            (productData.data()?.price as number) *
            cart.quantity,
        });
        console.log("Order item added successfully.");
        // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
      } catch (error) {
        console.error("Error adding order item: ", error);
      }
    });
  } catch (error) {
    console.error("Error creating order: ", error);
  }
};
