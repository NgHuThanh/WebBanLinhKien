import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Box, Button, Stack, Typography } from "@mui/material";
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
import {
  addToCart,
  db,
  getDetailProduct,
  writeExample,
} from "../firebase/config";
import { Product, productConverter } from "@/model/product";
import { Order, orderConverter } from "@/model/order";

const Detail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const idProduct = `${id}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.error("Đọc fetchDataDetail.44 ");
      try {
        const productData = await getDetailProduct(idProduct);
        console.error("Đọc fetchDataDetail setProduct ");
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    fetchData();
  }, [idProduct]);

  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button onClick={() => router.back()}>
          <Typography sx={{ color: "black" }}>Back</Typography>
        </Button>
        <Button onClick={() => router.push("/cart")}>
          <Typography sx={{ color: "black" }}>
            <ShoppingCartSharpIcon></ShoppingCartSharpIcon>
          </Typography>
        </Button>
      </Box>

      <Stack sx={{ padding: "10px" }}>
        <SliceDetail />
        <InfomationDetail
          name={product?.name}
          description={product?.description}
          price={product?.price}
          discount={product?.saleinfor}
        />
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
          onClick={() => {
            if (product) {
              addToCart({ product: product }); // Chuyển đối số product vào hàm addToCart
            } else {
              console.error("Product is null");
            }
          }}
        >
          <ShoppingCartSharpIcon />
          Add to cart
        </Button>
        <OfferDetail offer={product?.offer} />
        <HightLight hightLight={product?.description} />
        <RatingReview />

        <SimilarProduct />
      </Stack>
    </>
  );
};

export default Detail;
