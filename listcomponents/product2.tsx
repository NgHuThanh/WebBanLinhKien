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
import { db, getProductData } from "@/pages/firebase/config";
import { Product } from "@/model/product";

const Product2 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const productListData = await getProductData();
        setProducts(productListData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    fetchData();
    // const getData = async () => {
    //   let productListRef = collection(db, "products").withConverter(
    //     productConverter
    //   );
    //   let productList = await getDocs(productListRef);
    //   let productListData = productList.docs.map((doc) => doc.data());
    //   setProducts(productListData);
    // };
    // getData();
    // Cleanup function (optional) to unsubscribe or perform other clean-up tasks
    // Since this effect runs only once, cleanup is not critical here
    // But you might need it in other useEffect scenarios
    // return () => {};
  }, []);
  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }
  return (
    <Box>
      <Box>
        <h2>Top Deals on Electronics</h2>
      </Box>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Link href={`/detail/${product.id}`} underline="none">
              <Card
                sx={{
                  maxWidth: 300,
                  backgroundColor: "#ffffff",
                  color: "#000000",
                }}
              >
                {" "}
                {/* Cấu hình màu nền và màu chữ */}
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.image}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
                <CardContent style={{ maxHeight: "100px", overflow: "hidden" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="black">
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
