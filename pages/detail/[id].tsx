import React, { useState } from "react";
import router, { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Box, Button, Stack } from "@mui/material";
import SliceDetail from "./slice";
import InfomationDetail from "./infomation";
import OfferDetail from "./offer";
import HightLight from "./highlight";
import RatingReview from "./review";
import SimilarProduct from "./similar";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import RenderImage from "./renderimage";

import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
class Order {
  id: string;
  user_id: number;
  state: string;
  // classId: string
  constructor(id: string, user_id: number, state: string) {
    this.id = id;
    this.user_id = user_id;
    this.state = state;
  }
}
const orderConverter = {
  toFirestore: (order: Order) => {
    return {
      user_id: order.user_id,
      state: order.state,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Order(snapshot.id, data.user_id, data.state);
  },
};
class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offer: string;
  technical: string;
  image: string;
  // classId: string
  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    offer: string,
    technical: string,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.offer = offer;
    this.technical = technical;
    this.image = image;
  }
}
const productConverter = {
  toFirestore: (product: Product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      offer: product.offer,
      technical: product.technical,
      image: product.image,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Product(
      snapshot.id,
      data.name,
      data.description,
      data.price,
      data.offer,
      data.technical,
      data.image
    );
  },
};

const Detail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const idProduct = `${id}`;
  const [orderPrepare, setOrderPrepare] = useState<Order | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  let isGetPrepareCalled = false;
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
  const db = getFirestore(app);

  const getData = async () => {
    let productRef = doc(db, "products", idProduct).withConverter(
      productConverter
    );
    let productData = await getDoc(productRef);
    console.log(productData.data()?.name);
    if (productData.exists()) {
      const data = productData.data();
      const newProduct = new Product(
        data.id,
        data.name,
        data.description,
        data.price,
        data.offer,
        data.technical,
        data.image
      );
      setProduct(newProduct);
    } else {
      console.log("Product not found!");
    }
  };
  getData();
  const getPrepare = async () => {
    let orderListRef = collection(db, "orders").withConverter(orderConverter);
    let orderList = await getDocs(orderListRef);
    let orderListData = await orderList.docs.map((doc) => doc.data());
    let isGetPrepareCalled = false;
    const prepareOrder = orderListData.find(
      (order) => order.state === "prepare"
    );
    if (isGetPrepareCalled) {
      return;
    }
    if (prepareOrder) {
      setOrderPrepare(prepareOrder);
    } else {
      let isAddOrderExecuted = false;

      try {
        if (!isAddOrderExecuted) {
          await addDoc(collection(db, "orders"), {
            user_id: "/users/cwLswy3CVB3YQ5z9tFiy",
            state: "prepare",
          });
          console.log("Order added successfully.");
          isGetPrepareCalled = true;
          // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
          isAddOrderExecuted = true; // Đánh dấu rằng đoạn mã đã được thực thi thành công
        } else {
          console.log("Order has already been added.");
        }
      } catch (error) {
        console.error("Error adding order item: ", error);
      }
    }
  };
  getPrepare();
  const handleAddToCart = async () => {
    console.log("Đọc được tới đây");

    try {
      await addDoc(collection(db, "order_items"), {
        order_id: "/orders/" + orderPrepare?.id,
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

  return (
    <>
      <Stack sx={{ padding: "10px" }}>
        <SliceDetail />
        <InfomationDetail
          name={product?.name}
          description={product?.description}
          price={product?.price}
        />

        <OfferDetail offer={product?.offer} />
        <HightLight />
        <RatingReview />
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "15px",
            marginLeft: "auto",
            width: "100%",
          }}
          onClick={handleAddToCart}
        >
          <ShoppingCartSharpIcon />
          Add to cart
        </Button>
        <SimilarProduct />
      </Stack>
    </>
  );
};

export default Detail;
