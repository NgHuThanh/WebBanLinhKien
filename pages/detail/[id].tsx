import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Box, Button, Stack, Typography, Badge, Snackbar } from "@mui/material";
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
} from "../../firebase/config";
import { Product, productConverter } from "@/model/product";

import { Cart } from "@/model/cart";
import Loading from "@/listcomponents/loading";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BackButton from "@/listcomponents/backbutton";
import { getCookie } from "cookies-next";

const Detail: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const idProduct = `${id}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false); 
  const user_id = getCookie("user_id");
  async function fetchData() {
    console.error("Đọc fetchDataDetail.44 ");
    try {
      
        if (!user_id) {
            
        }
      else{
        const cartListData = await getCartData();
        setCarts(cartListData);
      }
      
      const productData = await getDetailProduct(idProduct);
      const productListData = await getProductData();
      const filteredProductListData = productListData.filter(
        (product) => product.idcategories === productData.idcategories
      );
      console.error("Đọc fetchDataDetail setProduct ");
      setProduct(productData);
      setProducts(productListData);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }
  
  useEffect(() => {
    if(!product){
      fetchData();
    }
    
  });

  // Hàm xử lý khi nhấn nút "Add to cart"
  const handleAddToCart = () => {
    
    if (product) {
      addToCart({ product: product }); // Chuyển đối số product vào hàm addToCart
      setShowSnackbar(true); // Hiển thị Snackbar
    } else {
      console.error("Product is null");
    }
  };
  const pressButtonAddToCart = () => {
    if (!user_id) {
      router.push("/login")
    }
    handleAddToCart();
    fetchData();
  };
  // Đóng Snackbar
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  const handlePressCart = () => {
    if (!user_id) {
      router.push("/login")
    }
    router.push("/cart");
  };

  if (loading) {
    return <Loading />; // Hiển thị thông báo tải dữ liệu
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <BackButton />
        <Button onClick={handlePressCart}>
          <Badge
            sx={{
              height: "30px",
              ml: "10px",
            }}
            badgeContent={carts.length}
            color="error"
          ></Badge>
          <Typography sx={{ color: "black" }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: "30px" }} />
          </Typography>
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
          onClick={pressButtonAddToCart} // Sử dụng hàm xử lý khi nhấn nút "Add to cart"
        >
          <ShoppingCartSharpIcon />
          Add to cart
        </Button>
        <OfferDetail offer={product?.offer} />
        <HightLight hightLight={product?.description} />
        {/* <RatingReview /> */}

        <SimilarProduct products={products} />
      </Stack>

      {/* Snackbar hiển thị thông báo */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000} // Thiết lập thời gian tự động ẩn Snackbar sau 3 giây
        onClose={handleCloseSnackbar} // Sử dụng hàm để đóng Snackbar khi nhấn nút đóng
        message="Added to cart successfully!" // Nội dung thông báo
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }} // Vị trí hiển thị ở góc dưới bên phải
        sx={{
          backgroundColor: "green", // Màu nền
          color: "white", // Màu chữ
          borderRadius: "10px", // Bo tròn các góc
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Đổ bóng
        }}
      />
    </>
  );
};

export default Detail;
