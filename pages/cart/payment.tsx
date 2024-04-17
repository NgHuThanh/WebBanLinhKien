import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { getDoc } from "firebase/firestore";
import {
  getCartData,
  handleDeleteCart,
  handleDeleteCartsToAddOrderItem,
  handleUpdateCart,
} from "../firebase/config";
import { Cart } from "@/model/cart";
import { productConverter } from "@/model/product";
import ProductCart from "./CartComponent/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const Payment = () => {
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
    document.body.style.overflow = "hidden"; // Khóa cuộn trang khi hiển thị pop-up
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    document.body.style.overflow = ""; // Mở khóa cuộn trang khi đóng pop-up
  };

  return (
    <main>
      <Box py={8}>
        <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
          Payment validation
        </Typography>
        <Stack>
          {carts.map((cart: Cart, index: number) => (
            <Box sx={{ border: "1px solid black", padding: "10px" }} key={index}>
              <ProductCart cart={cart}></ProductCart>
              <Typography>------------Product------------</Typography>
              <Typography>Quantities: {cart.quantity}</Typography>

              <Button
                onClick={() => {
                  handleUpdateCart({ cart: cart, quantity: cart.quantity + 1 }),
                    updateCartQuantity(index, cart.quantity + 1);
                }}
              >
                <AddIcon />
              </Button>
              <Button
                onClick={() => {
                  handleUpdateCart({ cart: cart, quantity: cart.quantity - 1 }),
                    updateCartQuantity(index, cart.quantity - 1);
                }}
              >
                <RemoveIcon />
              </Button>
              <Button
                onClick={() => {
                  handleDeleteCart({ cart: cart }), fetchData();
                }}
              >
                <DeleteIcon />
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box py={2}>
        <Typography>Total: {total}</Typography>
        <Typography>Total Discount: {totalDiscount}</Typography>
        <Typography>Total Pay: {total - totalDiscount}</Typography>
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
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography variant="h3">Mua hàng thành công!</Typography>
            <Button onClick={handleClosePopup}>Đóng</Button>
          </Box>
        </Box>
      )}
    </main>
  );
};

export default Payment;
