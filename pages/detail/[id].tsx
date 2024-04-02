import React, { useEffect, useState } from "react";
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
  // const handleAddToCart = async () => {
  //   console.log("Đọc được tới đây");
  //   try {
  //     await addDoc(collection(db, "order_items"), {
  //       order_id: "/orders/" + orderPrepare?.id,
  //       product_id: "/products/" + product?.id,
  //       quantity: "1",
  //       price: product?.price,
  //     });
  //     console.log("Order item added successfully.");
  //     // Chuyển hướng đến trang giỏ hàng sau khi thêm thành công
  //   } catch (error) {
  //     console.error("Error adding order item: ", error);
  //   }
  // };
  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }
  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <Stack sx={{ padding: "10px" }}>
        <SliceDetail />
        <InfomationDetail
          name={product?.name}
          description={product?.description}
          price={product?.price}
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
        <HightLight />
        <RatingReview />

        <SimilarProduct />
      </Stack>
    </>
  );
};

export default Detail;
