import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Button, Stack } from "@mui/material";

import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";

import { Product } from "@/model/product";
import HightLight from "@/pages/detail/highlight";
import InfomationDetail from "@/pages/detail/infomation";
import OfferDetail from "@/pages/detail/offer";
import RatingReview from "@/pages/detail/review";
import SimilarProduct from "@/pages/detail/similar";
import SliceDetail from "@/pages/detail/slice";
import { addToCart, getDetailProduct } from "@/firebase/config";
import { NextPageWithLayout } from "@/pages/_app";
import { useCart } from "@/pages/cart/CartContext";

const Detail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const idProduct = `${id}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await getDetailProduct(idProduct);
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
