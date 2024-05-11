import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DocumentReference, getDoc } from "firebase/firestore";
import {
  getCartData,
  handleDeleteCartsToAddOrderItem,
} from "../firebase/config";
import { Cart } from "@/model/cart";
import { productConverter } from "@/model/product";
import ProductCart from "./CartComponent/Product";
import { useRouter } from "next/router";
import BackButton from "@/listcomponents/backbutton";

const Payment = () => {
  const router = useRouter(); // Di chuyển đến đầu hàm

  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const updateCartQuantity = (index: number, newQuantity: number) => {
    const updatedCarts = [...carts];
    updatedCarts[index].quantity = newQuantity;
    setCarts(updatedCarts);
  };

  async function fetchData() {
    try {
      const cartListData = await getCartData();
      let totalPrice = 0;
      let totalDiscount = 0;

      for (const cart of cartListData) {
        const productRefer = cart.product_id.withConverter(productConverter);
        const productData = await getDoc(productRefer);
        totalPrice += (productData.data()?.price as number) * cart.quantity;
        totalDiscount +=
          ((productData.data()?.price as number) *
            (productData.data()?.saleinfor as number)) /
          100;
      }

      setCarts(cartListData);
      setTotal(totalPrice);
      setTotalDiscount(totalDiscount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  const handleConfirmBuy = () => {
    handleDeleteCartsToAddOrderItem({ carts });
    setShowSuccessPopup(true);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    document.body.style.overflow = "";
    router.push("/homegroup");
  };

  return (
    <main>
      <BackButton />
      <Box sx={{paddingBottom:"0px"}}py={0}>
        <Typography sx={{ textAlign: "center", fontSize: "30px",fontWeight:"bold" }}>
          Payment validation
        </Typography>
        <Stack>
          {carts.map((cart: Cart, index: number) => (
            <Box
            sx={{
              borderRadius: 5,
              padding: "10px",
              marginBottom: 2,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", // Adding shadow
            }}
            key={index}
          >
            <ProductCart product_id={cart.product_id as DocumentReference} />
            <Typography style={{color:"green",fontWeight:"bold",borderRadius:10}}>Quantity: {cart.quantity}</Typography>
          </Box>
          ))}
        </Stack>
      </Box>
      <Box py={2}>
      <Box py={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "23px", color: 'black' }}>Total:</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "23px", color: 'green' }}>{total} $</Typography>
      </Box>
      <Box py={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "23px", color: 'black' }}>Total Discount:</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "23px", color: 'red' }}>{totalDiscount} $</Typography>
      </Box>
      <Box py={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "23px", color: 'black' }}>Total Pay:</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "23px", color: 'green' }}>{total - totalDiscount} $</Typography>
      </Box>


      </Box>
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
          mt: "10px",
        }}
        onClick={handleConfirmBuy}
      >
        Confirm buy
      </Button>

      {showSuccessPopup && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              margin:2,
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography style={{fontSize:"28px"}}>Mua hàng thành công!</Typography>
            <Button style={{backgroundColor:"blue",color:"#FFF"}}onClick={handleClosePopup}>Đóng</Button>
          </Box>
        </Box>
      )}
    </main>
  );
};

export default Payment;
