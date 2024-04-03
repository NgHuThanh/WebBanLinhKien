import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Address from "./CartComponent/Address";
import {
  productActions,
  productSelectors,
} from "@/lib/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Product from "./CartComponent/Product";
import Billinfo from "./CartComponent/Billinfo"; // Import Billinfo component
import {
  getCartData,
  handleDeleteCart,
  handleUpdateCart,
} from "../firebase/config";
import { Cart } from "@/model/cart";
import ProductCart from "./CartComponent/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation } from "react-router-dom";
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
          {carts.map((cart: Cart, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Box sx={{ border: "1px solid black", padding: "10px" }}>
              <ProductCart cart={cart}></ProductCart>
              <Typography>------------Product------------</Typography>
              <Typography>Quantities: {cart.quantity}</Typography>
              <Typography>Price per product: {cart.price}</Typography>
              <Button
                onClick={() => {
                  handleUpdateCart({ cart: cart, quantity: cart.quantity + 1 }),
                    handleIncrementQuantity(
                      index,
                      cart.price + cart.discount,
                      cart.discount
                    );
                }}
              >
                <AddIcon />
              </Button>
              <Button
                onClick={() => {
                  handleUpdateCart({ cart: cart, quantity: cart.quantity - 1 }),
                    handleDecrementQuantity(
                      index,
                      cart.price + cart.discount,
                      cart.discount
                    );
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
        onClick={() => {}}
      >
        Confirm buy
      </Button>
    </main>
  );
};

export default Payment;
