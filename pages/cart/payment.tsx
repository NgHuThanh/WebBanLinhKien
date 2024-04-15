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
  handleDeleteCartsToAddOrderItem,
  handleUpdateCart,
} from "../firebase/config";
import { Cart } from "@/model/cart";
import ProductCart from "./CartComponent/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { getDoc } from "firebase/firestore";
import { productConverter } from "@/model/product";

const Payment = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCarts, setSelectedCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
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
      setTotal(totalPrice);
      setTotalDiscount(totalDiscount);
      setTotalPay(totalPrice - totalDiscount);
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
      <Box py={8}>
        <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
          Payment validation
        </Typography>
        <Stack>
          {carts.map((cart: Cart, index: number) => (
            // eslint-disable-next-line react/jsx-key
            <Box sx={{ border: "1px solid black", padding: "10px" }}>
              <ProductCart cart={cart}></ProductCart>
              <Typography>------------Product------------</Typography>
              <Typography>Quantities: {cart.quantity}</Typography>

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
          mt: "10px",
        }}
        onClick={handleConfirmBuy}
      >
        Confirm buy
      </Button>
    </main>
  );
};

export default Payment;
