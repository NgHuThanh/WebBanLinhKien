import React, { useEffect, useState } from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Address from "./CartComponent/Address";
import {
  getCartData,
  handleDeleteCart,
  handleMarkCart,
  handleUpdateCart,
} from "../firebase/config";
import { Cart } from "@/model/cart";
import ProductCart from "./CartComponent/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Billinfo from "./CartComponent/Billinfo";
import router from "next/router";
import { productConverter } from "@/model/product";
import { getDoc } from "firebase/firestore";
import BackButton from "@/listcomponents/backbutton";
import firebase from "firebase/compat/app";

const CartUser = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCarts, setSelectedCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  // firebase.app().delete().then(function() {
  //   console.log("[DEFAULT] App is Gone Now");
  // });
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const cartListData = await getCartData();

      let totalPrice = 0;
      let totalDiscount = 0;

      // Sử dụng vòng lặp for...of để thực hiện các lệnh await một cách tuần tự
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
      if (!Number.isNaN(totalPrice)) {
        setTotal(totalPrice);
        setTotalDiscount(totalDiscount);
        setTotalPay(totalPrice - totalDiscount);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }

  const handleToggleMarkCart = (cart: Cart) => {
    const updatedSelectedCarts = [...selectedCarts];
    const index = updatedSelectedCarts.findIndex(
      (selectedCart) => selectedCart.id === cart.id
    );
    if (index === -1) {
      updatedSelectedCarts.push(cart);
    } else {
      updatedSelectedCarts.splice(index, 1);
    }
    setSelectedCarts(updatedSelectedCarts);
    handleMarkCart({ cart: cart, mark: index === -1 });
  };

  const handleQuantityChange = (index: number, quantityChange: number) => {
    const updatedCarts = [...carts];
    updatedCarts[index].quantity += quantityChange;
    setCarts(updatedCarts);
    setTotal(
      (prevTotal) => prevTotal + quantityChange * updatedCarts[index].price
    );
    setTotalDiscount(
      (prevDiscount) =>
        prevDiscount + quantityChange * updatedCarts[index].discount
    );
    handleUpdateCart({
      cart: updatedCarts[index],
      quantity: updatedCarts[index].quantity,
    });
    fetchData();
  };

  const handleDeleteCartItem = (cart: Cart) => {
    const updatedCarts = carts.filter((c) => c.id !== cart.id);
    setCarts(updatedCarts);
    handleDeleteCart({ cart: cart });
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <main>
      <BackButton />
      <Typography variant="h5" gutterBottom>
        Cart have {carts.length} items
      </Typography>
      <Address />
      <Box py={4}>
        <Stack spacing={2}>
          {carts.map((cart: Cart, index: number) => (
            <Box
              key={cart.id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 4,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={() => handleToggleMarkCart(cart)}>
                {selectedCarts.some(
                  (selectedCart) => selectedCart.id === cart.id
                ) ? (
                  <DoneIcon />
                ) : (
                  "Add to payment"
                )}
              </Button>
              <ProductCart cart={cart} />
              <Box display="flex" alignItems="center">
                <Button
                  onClick={() => handleQuantityChange(index, -1)}
                  disabled={cart.quantity <= 0}
                >
                  <RemoveIcon />
                </Button>
                <Typography variant="body2">{cart.quantity}</Typography>
                <Button onClick={() => handleQuantityChange(index, 1)}>
                  <AddIcon />
                </Button>
                <Button onClick={() => handleDeleteCartItem(cart)}>
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      <Billinfo
        deliveryDate="Not set up yet"
        totalAmount={total ? total : 0}
        discount={totalDiscount ? totalDiscount : 0}
        shippingFee={0}
      />
      <Box sx={{ justifyContent: "center" }}>
        <Link href="/cart/payment" underline="none">
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
          >
            Proceed to pay (${totalPay})
          </Button>
        </Link>
      </Box>
    </main>
  );
};

export default CartUser;
