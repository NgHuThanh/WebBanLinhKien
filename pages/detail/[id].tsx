import React, { useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Button, Stack } from "@mui/material";
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
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
class Product {
  name: string;
  description: string;
  price: number;
  offer: string;
  technical: string;
  image: string;
  // classId: string
  constructor(
    name: string,
    description: string,
    price: number,
    offer: string,
    technical: string,
    image: string
  ) {
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

  const firebaseConfig = {
    apiKey: "AIzaSyDxPdKcUdO25lL4YivzClfgIijIbNipTjs",
    authDomain: "fir-demo-de07f.firebaseapp.com",
    projectId: "fir-demo-de07f",
    storageBucket: "fir-demo-de07f.appspot.com",
    messagingSenderId: "998152591354",
    appId: "1:998152591354:web:f8dcd52c0037f09c333643",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const getData = async () => {
    let product = doc(db, "products", idProduct).withConverter(
      productConverter
    );
    let productData = await getDoc(product);
    console.log(productData.data()?.name);

    setProductName(productData.data()?.name as string);
    setProductPrice(productData.data()?.price as number);
    setProductDescription(productData.data()?.description as string);
    setProductOffer(productData.data()?.offer as string);
  };
  getData();
  return (
    <>
      <Stack sx={{ padding: "10px" }}>
        <SliceDetail />
        <InfomationDetail
          name={productName}
          description={productDescription}
          price={productPrice}
        />

        <OfferDetail offer={productOffer} />
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
        >
          <ShoppingCartSharpIcon></ShoppingCartSharpIcon>
          Add to cart now
        </Button>
        <SimilarProduct />
      </Stack>
    </>
  );
};

export default Detail;
