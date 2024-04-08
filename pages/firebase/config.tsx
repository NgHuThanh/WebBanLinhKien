import { Cart, cartConverter } from "@/model/cart";
import { ListProduct, Product, productConverter } from "@/model/product";
import { initializeApp } from "firebase/app";
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY2lqutit7K6F1jCFKmOP2ut1U8rG719Q",
  authDomain: "testwriteread-77258.firebaseapp.com",
  projectId: "testwriteread-77258",
  storageBucket: "testwriteread-77258.appspot.com",
  messagingSenderId: "696816126933",
  appId: "1:696816126933:web:c44c585f6e2b5a198d4b5c",
  measurementId: "G-CMYW8WZW89",
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
      data.image,
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
    await addDoc(collection(db, "users/cwLswy3CVB3YQ5z9tFiy/cart"), {
      product_id: productRef, // Sử dụng reference thay vì string
      quantity: 1,
      price: priceAsNumber,
      discount: discountAsNumber,
      mark: false,
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
    await updateDoc(doc(db, "users/cwLswy3CVB3YQ5z9tFiy/cart", props.cart.id), {
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
    await updateDoc(doc(db, "users/cwLswy3CVB3YQ5z9tFiy/cart", props.cart.id), {
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
    await deleteDoc(doc(db, "users/cwLswy3CVB3YQ5z9tFiy/cart", props.cart.id));
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
  props.carts.forEach(async (cart) => {
    try {
      await deleteDoc(doc(db, "users/cwLswy3CVB3YQ5z9tFiy/cart", cart.id));
      console.log("Cart item deleted successfully.");
      // Chuyển hướng đến trang giỏ hàng sau khi xóa thành công
    } catch (error) {
      console.error("Error deleting cart item: ", error);
    }
    try {
      const productRef = doc(db, "products", cart.id);
      const currentNumber = currentProductNumber++;
      await addDoc(collection(db, "users/cwLswy3CVB3YQ5z9tFiy/orders"), {
        product_id: productRef,
        quantity: cart.quantity,
        state: false,
        price: cart.price * cart.quantity,
      });
      console.log("Order item added successfully.");
      // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
    } catch (error) {
      console.error("Error adding order item: ", error);
    }
  });
};
