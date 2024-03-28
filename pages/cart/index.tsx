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
import { getCartData } from "../firebase/config";
import { Cart } from "@/model/cart";
import ProductCart from "./CartComponent/Product";
const CartUser = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const cartListData = await getCartData();
        let total = 0;
        setCarts(cartListData);
        //carts.forEach((cart) => (total += cart.price * cart.quantity));
        //setTotal(total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }

  // const cartNumber = 2;

  // const handleBack = () => {
  //   window.history.back();
  // };
  // const productsIds = useAppSelector((state) =>
  //   productSelectors.selectIds(state)
  // );
  // const appDispatch = useAppDispatch();
  // const add = () => {
  //   appDispatch(productActions.addProduct({ initialValue: 1 }));
  // };

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
          {carts.map((cart: Cart) => (
            // eslint-disable-next-line react/jsx-key
            <Box sx={{ border: "1px solid black", padding: "10px" }}>
              <ProductCart cart={cart}></ProductCart>
              <Typography>Quantities: {cart.quantity}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
      <Billinfo
        deliveryDate={"Not set up yet"}
        totalAmount={total}
        discount={0}
        shippingFee={0}
      />
    </main>
  );
};

export default CartUser;
