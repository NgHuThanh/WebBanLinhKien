import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Box, Button, Stack, Typography, Badge } from "@mui/material";
import SliceDetail from "./slice";
import InfomationDetail from "./infomation";
import OfferDetail from "./offer";
import HightLight from "./highlight";
import RatingReview from "./review";
import SimilarProduct from "./similar";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import RenderImage from "./renderimage";
import CircularProgress from "@mui/material/CircularProgress";
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
  getCartData,
  getDetailProduct,
  getProductData,
  writeExample,
} from "../firebase/config";
import { Product, productConverter } from "@/model/product";
import { Order, orderConverter } from "@/model/order";
import { Cart } from "@/model/cart";
import Loading from "@/listcomponents/loading";

const Detail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const idProduct = `${id}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.error("Đọc fetchDataDetail.44 ");
      try {
        const cartListData = await getCartData();
        const productData = await getDetailProduct(idProduct);
        const productListData = await getProductData();
        const filteredProductListData = productListData.filter(
          (product) => product.idcategories === productData.idcategories
        );
        console.error("Đọc fetchDataDetail setProduct ");
        setProduct(productData);
        setProducts(productListData);
        setLoading(false);
        setCarts(cartListData);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    fetchData();
  }, [idProduct]);

  if (loading) {
    return <Loading></Loading>; // Hiển thị thông báo tải dữ liệu
  }
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button onClick={() => router.back()}>
          <Typography sx={{ color: "black" }}>Back</Typography>
        </Button>
        <Button onClick={() => router.push("/cart")}>
          <Badge badgeContent={carts.length} color="error">
            <ShoppingCartSharpIcon />
          </Badge>
        </Button>
      </Box>

      <Stack sx={{ padding: "10px" }}>
        <SliceDetail image={product?.image} />
        <InfomationDetail
          name={product?.name}
          description={product?.description}
          price={product?.price}
          discount={product?.saleinfor}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: "black",
            color: "white",
            borderRadius: 0,
            width: "100%",
            mt: "10px",
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

        <SimilarProduct products={products} />
      </Stack>
    </>
  );
};

export default Detail;
