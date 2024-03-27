import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
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
const Product2 = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Initialize Firebase

  // Initialize Cloud Firestore and get a reference to the service

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyATnmpP4jkLiXKx1PvknQvW992tBDGD6IU",
      authDomain: "caijdodb.firebaseapp.com",
      projectId: "caijdodb",
      storageBucket: "caijdodb.appspot.com",
      messagingSenderId: "556827412764",
      appId: "1:556827412764:web:c0b1c4de752f91f9a592d9",
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const getData = async () => {
      let productListRef = collection(db, "products").withConverter(
        productConverter
      );
      let productList = await getDocs(productListRef);
      let productListData = productList.docs.map((doc) => doc.data());
      setProducts(productListData);
    };
    getData();

    // Cleanup function (optional) to unsubscribe or perform other clean-up tasks
    // Since this effect runs only once, cleanup is not critical here
    // But you might need it in other useEffect scenarios
    // return () => {};
  }, []);

  return (
    <Box>
      <Box>
        <h2>Top Deals on Electronics</h2>
      </Box>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Link href={`/detail/${product.id}`} underline="none">
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product2;
