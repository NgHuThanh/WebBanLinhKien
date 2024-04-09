import React, { useEffect, useState } from "react";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Address from "./CartComponent/Address";
import { getCartData, handleDeleteCart, handleMarkCart, handleUpdateCart } from "../firebase/config";
import { Cart } from "@/model/cart";
import ProductCart from "./CartComponent/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Billinfo from "./CartComponent/Billinfo";

const CartUser = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCarts, setSelectedCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const cartListData = await getCartData();
      setCarts(cartListData);
      let totalPrice = 0;
      let totalDiscount = 0;
      cartListData.forEach(cart => {
        totalPrice += (cart.discount + cart.price) * cart.quantity;
        totalDiscount += cart.discount * cart.quantity;
      });
      setTotal(totalPrice);
      setTotalDiscount(totalDiscount);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }

  const handleToggleMarkCart = (cart: Cart) => {
    const updatedSelectedCarts = [...selectedCarts];
    const index = updatedSelectedCarts.findIndex(selectedCart => selectedCart.id === cart.id);
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
    setTotal(prevTotal => prevTotal + (quantityChange * updatedCarts[index].price));
    setTotalDiscount(prevDiscount => prevDiscount + (quantityChange * updatedCarts[index].discount));
    handleUpdateCart({ cart: updatedCarts[index], quantity: updatedCarts[index].quantity });
  };

  const handleDeleteCartItem = (cart: Cart) => {
    const updatedCarts = carts.filter(c => c.id !== cart.id);
    setCarts(updatedCarts);
    handleDeleteCart({ cart: cart });
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <main>
      <Typography variant="h5" gutterBottom>Cart ({carts.length} items)</Typography>
      <Address />
      <Box py={4}>
        <Stack spacing={2}>
          {carts.map((cart: Cart, index: number) => (
            <Box key={cart.id} sx={{ border: "1px solid #ddd", borderRadius: 4, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <Button onClick={() => handleToggleMarkCart(cart)}>
                {selectedCarts.some(selectedCart => selectedCart.id === cart.id) ? (
                  <DoneIcon />
                ) : (
                  "Add to payment"
                )}
              </Button>
              <ProductCart cart={cart} />
              <Box display="flex" alignItems="center">
                <Button onClick={() => handleQuantityChange(index, -1)} disabled={cart.quantity <= 0}><RemoveIcon /></Button>
                <Typography variant="body2">{cart.quantity}</Typography>
                <Button onClick={() => handleQuantityChange(index, 1)}><AddIcon /></Button>
                <Button onClick={() => handleDeleteCartItem(cart)}><DeleteIcon /></Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
      <Billinfo deliveryDate="Not set up yet" totalAmount={total} discount={totalDiscount} shippingFee={0} />
      <Box sx={{justifyContent: "center" }}>
        <Link href="/cart/payment" underline="none">
          <Button variant="contained" color="primary" sx={{ bgcolor: "black", color: "white", borderRadius: 0, width: "100%",mt:"10px" }}>
            Proceed to pay (${total})
          </Button>
        </Link>
      </Box>
    </main>
  );
};

export default CartUser;
