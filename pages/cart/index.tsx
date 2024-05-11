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
import { DocumentReference, getDoc } from "firebase/firestore";
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
    <Box>
      <BackButton />
      <Box sx={{alignItems:"center"}}>
      <Typography variant="h5" style={{fontWeight:"bold",padding:10}}>
        Cart have {carts.length} items
      </Typography>
      </Box>
      
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
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)", // Adding shadow
            }}
          >
            <ProductCart product_id={cart.product_id as DocumentReference} />
            <Box sx={{ pt: "0px", pl: "99px" }} display="flex" alignItems="center">
              <Button
                onClick={() => handleQuantityChange(index, -1)}
                disabled={cart.quantity <= 0}
              >
                <RemoveIcon />
              </Button>
              <Typography sx={{fontWeight:"bold"}} variant="body2">{cart.quantity}</Typography>
              <Button onClick={() => handleQuantityChange(index, 1)}>
                <AddIcon sx={{color:"red"}}/>
              </Button>
              <Button onClick={() => handleDeleteCartItem(cart)}>
                <DeleteIcon sx={{color:"black"}}/>
              </Button >
            </Box>
          </Box>
          ))}
        </Stack>
      </Box>
      <Billinfo
        
        totalAmount={total ? total : 0}
        discount={totalDiscount ? totalDiscount : 0}
        shippingFee={0} 
        deliveryDate={""}      />
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
    </Box>
  );
};

export default CartUser;
