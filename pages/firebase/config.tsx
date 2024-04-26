import { Cart, cartConverter } from "@/model/cart";
import { orderDetailConverter } from "@/model/order";
import { ListProduct, Product, productConverter } from "@/model/product";
import { User, userConverter } from "@/model/user";
import { getCookie } from "cookies-next";
import { getApp, initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject } from "firebase/storage";
// firebase.app().delete().then(function() {
//   console.log("[DEFAULT] App is Gone Now");
// });

// function initializeAppIfNecessary() {

//   try {
  
//   return getApp();
  
//   } catch (any) {
  
//     const firebaseConfig = {
//       apiKey: "AIzaSyAA0x_RuXZDBaoQFMH53Fh9cg6FwO7era4",
//       authDomain: "weblinhtinh-bc3e4.firebaseapp.com",
//       projectId: "weblinhtinh-bc3e4",
//       storageBucket: "weblinhtinh-bc3e4.appspot.com",
//       messagingSenderId: "759158714505",
//       appId: "1:759158714505:web:2f05fd1766c48598715658",
//       measurementId: "G-DGEFW28115"
//     };
  
//   return initializeApp(firebaseConfig);
  
//   }
  
//   }
//   const app = initializeAppIfNecessary();
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
const user_id = getCookie("user_id");
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
export const getDetailProduct = async (id: string): Promise<Product> => {
  let productRef = doc(db, "products", id).withConverter(productConverter);
  let productData = await getDoc(productRef);
  console.log("đã đọc được dữ liệu ")
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
export const getProductData = async () => {
  let productListRef = collection(db, "products").withConverter(
    productConverter
  );
  let productList = await getDocs(productListRef);
  let productListData = productList.docs.map((doc) => doc.data());
  return productListData;
};

export const get1ProductData = async () => {
  let cartListRef = collection(
    db,
    "users/"+user_id+"/cart"
  ).withConverter(cartConverter);
  let cartList = await getDocs(cartListRef);
  let cartListData = cartList.docs.map((doc) => doc.data());
  return cartListData;
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
    const userRef = doc(db, "users", user_id as string);

    // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
    const querySnapshot = await getDocs(
      query(collection(db, "carts"), where("user_id", "==", userRef))
    );
    if (querySnapshot.empty) {
      return 0;
    }
    // "carts/" + querySnapshot.docs[0].id + "/cart";
    await updateDoc(
      doc(db, "carts/" + querySnapshot.docs[0].id + "/cart", props.cart.id),
      {
        quantity: props.quantity,
      }
    );
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
    const userRef = doc(db, "users", user_id as string);

    // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
    const querySnapshot = await getDocs(
      query(collection(db, "carts"), where("user_id", "==", userRef))
    );
    if (querySnapshot.empty) {
      return 0;
    }
    // "carts/" + querySnapshot.docs[0].id + "/cart";
    await deleteDoc(
      doc(db, "carts/" + querySnapshot.docs[0].id + "/cart", props.cart.id)
    );
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
    const userRef = doc(db, "users", user_id as string);

    const querySnapshot = await getDocs(
      query(collection(db, "carts"), where("user_id", "==", userRef))
    );
    // if (!querySnapshot.empty) {
    //   // Lặp qua từng tài liệu và xóa chúng
    //   querySnapshot.forEach(async (doc) => {
    //     try {
    //       await deleteDoc(doc.ref);
    //       console.log("Cart item deleted successfully.");
    //     } catch (error) {
    //       console.error("Error deleting cart item: ", error);
    //     }
    //   });
    // } else {
    //   console.log("No carts found for the user.");
    // }
    try {
      await deleteDoc(doc(db, "carts/" + querySnapshot.docs[0].id));
      // await deleteDoc(doc(db, "carts", querySnapshot.docs[0].id));

      console.log("Cart item deleted successfully.");
      // Chuyển hướng đến trang giỏ hàng sau khi xóa thành công
    } catch (error) {
      console.error("Error deleting cart item: ", error);
    }

    // Tạo một order mới
    const orderRef = await addDoc(collection(db, "orders"), {
      state: false,
      user_id: userRef,
    });

    console.log("Order created with ID");
    props.carts.forEach(async (cart) => {
      // try {
      //   await deleteDoc(doc(db, "carts/ZSNrIXRxuZCZS6kR4DtM/cart", cart.id));
      //   console.log("Cart item deleted successfully.");
      //   // Chuyển hướng đến trang giỏ hàng sau khi xóa thành công
      // } catch (error) {
      //   console.error("Error deleting cart item: ", error);
      // }
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
export const addToCart = async (props: { product: Product }) => {
  console.log("Đọc được tới đây");
  try {
    const userRef = doc(db, "users", user_id as string);

    // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
    const querySnapshot = await getDocs(
      query(collection(db, "carts"), where("user_id", "==", userRef))
    );

    let cartRef: DocumentReference;
    if (querySnapshot.empty) {
      // Nếu giỏ hàng chưa tồn tại, tạo mới
      cartRef = await addDoc(collection(db, "carts"), {
        user_id: userRef,
      });
    } else {
      // Nếu giỏ hàng đã tồn tại, sử dụng cartRef đầu tiên được tìm thấy
      cartRef = querySnapshot.docs[0].ref;
    }

    const productRef = doc(db, "products", props.product.id);

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProductQuery = query(
      collection(cartRef, "cart"),
      where("product_id", "==", productRef)
    );
    const existingProductSnapshot = await getDocs(existingProductQuery);

    if (existingProductSnapshot.empty) {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ hàng
      await addDoc(collection(cartRef, "cart"), {
        product_id: productRef,
        quantity: 1,
      });
      console.log("Item added into cart successfully.");
    } else {
      console.log("Item already exists in cart.");
      // Thực hiện hành động khác ở đây nếu cần thiết, ví dụ như thông báo cho người dùng.
    }

    // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  } catch (error) {
    console.error("Error adding order item: ", error);
  }
};


// export const getProductData = async () => {
//   let productListRef = collection(db, "products").withConverter(
//     productConverter
//   );
//   let productList = await getDocs(productListRef);
//   let productListData = productList.docs.map((doc) => doc.data());
//   return productListData;
// };

export const getUser = async ()=> {
  let userRef = doc(db, "users", user_id as string).withConverter(userConverter);
  let userData = await getDoc(userRef);

  // Trích xuất dữ liệu từ document và chuyển đổi sang kiểu Product
  if (userData.exists()) {
    const data = userData.data();
    return new User(
      data.id,
      data.address,
      data.email,
      data.username,
      data.password,

    );
  } else {
    throw new Error("Product not found"); // Xử lý trsường hợp không tìm thấy sản phẩm
  }
};
export const getOrderData = async () => {
  const userRef = doc(db, "users", user_id as string);

  // Kiểm tra xem đơn hàng của người dùng đã tồn tại chưa
  const querySnapshot = await getDocs(
    query(collection(db, "orders"), where("user_id", "==", userRef))
  );
  
  if (querySnapshot.empty) {
    // Trả về dữ liệu mẫu nếu không tìm thấy đơn hàng
    let orderListRef = collection(db, "order/ahosdisahdoi/orderDetail").withConverter(
      orderDetailConverter
    );
    let orderListFail = await getDocs(orderListRef);
    let orderListFailData = orderListFail.docs.map((doc) => doc.data());
    return orderListFailData;
  }

  // Lặp qua các tài liệu và trích xuất id của chúng
  const orderIds = querySnapshot.docs.map((doc) => doc.id);

  // Khởi tạo mảng để lưu trữ tất cả các đơn hàng
  let allOrderListData = [];

  // Lặp qua mỗi id và lấy dữ liệu từng đơn hàng
  for (const orderId of orderIds) {
    let orderListRef = collection(db, `orders/${orderId}/order_details`).withConverter(
      orderDetailConverter
    );
    let orderList = await getDocs(orderListRef);
    let orderListData = orderList.docs.map((doc) => doc.data());
    allOrderListData.push(...orderListData);
  }

  // Trả về tất cả dữ liệu đơn hàng
  return allOrderListData;
};



export const getCartData = async () => {
  const userRef = doc(db, "users", user_id as string);

  // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
  const querySnapshot = await getDocs(
    query(collection(db, "carts"), where("user_id", "==", userRef))
  );
  
  
  if (querySnapshot.empty) {
    let cartListRef = collection(db, "carts/ahosdisahdoi/cart").withConverter(
      cartConverter
    );
    let cartListFail = await getDocs(cartListRef);
    let cartListFailData = cartListFail.docs.map((doc) => doc.data());
    return cartListFailData;
  }
  // "carts/" + querySnapshot.docs[0].id + "/cart";
  let cartListRef = collection(
    db,
    "carts/" + querySnapshot.docs[0].id + "/cart"
  ).withConverter(cartConverter);
  let cartList = await getDocs(cartListRef);
  let cartListData = cartList.docs.map((doc) => doc.data());
  return cartListData;
};
