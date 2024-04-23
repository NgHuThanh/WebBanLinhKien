import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { getDoc } from "firebase/firestore";
import {
  getCartData,
  getOrderData,
  handleDeleteCart,
  handleDeleteCartsToAddOrderItem,
  handleUpdateCart,
} from "../firebase/config";
import { Cart } from "@/model/cart";
import { productConverter } from "@/model/product";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import ProductCart, { ProductOrder } from "../cart/CartComponent/Product";
import { OrderDetail } from "@/model/order";
import Loading from "@/listcomponents/loading";

const History = () => {
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    async function fetchData() {
        try {
          const orderDetailListData = await getOrderData();
          setOrders(orderDetailListData as OrderDetail[]);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product data: ", error);
        }
      }
    useEffect(() => {
    fetchData();
    }, []);
    if (loading) {
        return <Loading />; // Hiển thị thông báo tải dữ liệu
      }
  return (
    <main>
      <Box py={8}>
        <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
          Your histor buy items
        </Typography>
        <Stack>
          {orders.map((cart: OrderDetail, index: number) => (
            <Box sx={{ border: "1px solid black", padding: "10px" }} key={index}>
              <ProductOrder cart={cart}></ProductOrder>
              <Typography>------------Order------------</Typography>
              <Typography>Price: {cart.price}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    
     

      
    </main>
  );
};

export default History;
