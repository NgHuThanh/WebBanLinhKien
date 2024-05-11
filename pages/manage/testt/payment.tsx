import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import {
  productActions,
  productSelectors,
} from "@/lib/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Cart } from "@/model/cart";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Address from "@/pages/cart/CartComponent/Address";
import Billinfo from "@/pages/cart/CartComponent/Billinfo";
import ProductCart from "@/pages/cart/CartComponent/Product";
import {
  getCartData,
  handleDeleteCartsToAddOrderItem,
  handleUpdateCart,
  handleDeleteCart,
} from "@/firebase/config";
import { useCart } from "@/pages/cart/CartContext";

const Payment = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCarts, setSelectedCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const updateCartQuantity = (index: number, newQuantity: number) => {
    const updatedCarts = [...carts];
    updatedCarts[index].quantity = newQuantity;
    setCarts(updatedCarts);
  };
  const { cart, addToCart, removeFromCart } = useCart();
  const handleIncrementQuantity = (
    index: number,
    priceUp: number,
    discountUp: number
  ) => {
    const updatedCarts = [...carts];
    updatedCarts[index].quantity += 1;
    setCarts(updatedCarts);
    setTotal((total) => total + priceUp);
    setTotalDiscount((discount) => (discount += discountUp));
  };

  const handleDecrementQuantity = (
    index: number,
    priceUp: number,
    discountUp: number
  ) => {
    const updatedCarts = [...carts];
    if (updatedCarts[index].quantity > 1) {
      updatedCarts[index].quantity -= 1;
      setCarts(updatedCarts);
      setTotal((total) => total - priceUp);
      setTotalDiscount((discount) => (discount -= discountUp));
    }
  };
  async function fetchData() {
    try {
      const cartListData = await getCartData();
      const markedCarts = cartListData.filter((cart) => cart.mark === true);
      setCarts(markedCarts);
      let totalPrice = 0;
      let totalDiscount = 0;
      cartListData.forEach(
        (cart) => (
          (totalPrice += (cart.discount + cart.price) * cart.quantity),
          (totalDiscount += cart.discount * cart.quantity)
        )
      );
      setTotalDiscount(totalDiscount);
      setTotal(totalPrice);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }
  const handleConfirmBuy = () => {
    handleDeleteCartsToAddOrderItem({ carts });
  };
  return (
    <main>
      <Box display="flex" alignItems="center">
        {/* <Button onClick={handleBack}>&lt;</Button> */}
        <Typography variant="body1" ml={1}>
          Cart {carts.length} items
        </Typography>
      </Box>
      <Address />
      <Box py={8}>
        <Stack>
          {cart.map((item, index) => (
            <div key={index}>
              <p>Product ID: {item.product_id}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </Stack>
      </Box>
      <Billinfo
        deliveryDate={"Not set up yet"}
        totalAmount={total}
        discount={totalDiscount}
        shippingFee={0}
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
        onClick={handleConfirmBuy}
      >
        Confirm buy
      </Button>
    </main>
  );
};

export default Payment;
