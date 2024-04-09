import React, { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star"; // Import icon
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Rating,
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
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.image}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                  }}
                />
                <CardContent style={{ maxHeight: "120px", overflow: "hidden" }}>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Số dòng muốn hiển thị
                      fontSize: "16px", // Điều chỉnh kích thước chữ
                      fontWeight: "bold", // In đậm chữ
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="black"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px", // Điều chỉnh kích thước chữ
                      fontWeight: "bold", // In đậm chữ
                    }}
                  >
                    {(product.price * 0.8).toFixed(0)}$
                    <Typography
                      style={{
                        marginLeft: "5px",
                        color: "grey",
                        display: "flex",
                        fontSize: "14px",
                        textDecoration: "line-through", // Điều chỉnh kích thước chữ
                      }}
                    >
                      {product.price}$
                    </Typography>
                    <Typography
                      color="green"
                      style={{
                        marginLeft: "5px", // Khoảng cách giữa hai phần tử
                        fontSize: "15px", // Điều chỉnh kích thước chữ
                        fontWeight: "bold", // In đậm chữ
                      }}
                    >
                      {product.saleinfor}% off
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="black"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Số dòng muốn hiển thị
                      fontSize: "12px", // Điều chỉnh kích thước chữ
                      fontWeight: "bold", // In đậm chữ
                      paddingTop: "10px",
                    }}
                  >
                    <LocalOfferIcon fontSize="inherit" /> {product.offer}
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
