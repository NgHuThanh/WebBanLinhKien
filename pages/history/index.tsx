import React, { ReactElement, useEffect, useState } from "react";
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
import Layout from "@/landingPage/layout";
import { getCookie } from "cookies-next";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const History = () => {
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    const user_id = getCookie("user_id");
    if(user_id == null ){
      return (<>
      <Button onClick={()=>router.push("/login")}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          Login now <AccountCircleIcon sx={{ marginLeft: '4px' }} />
        </Typography>
      </Button>
      
      </>);
    }
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
        return <Loading />; // Hisển thị thông báo tải dữ liệu
      }
    
  return (
      <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' ,backgroundColor:"#94d3f4"}}>
            <Box
              component="img"
              sx={{
                height: '100px',
                width: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
                marginRight: '10px', // Để tạo khoảng cách giữa hình ảnh và chữ
              }}
              src={"/defaultAvatar.avif"}
              alt={"none"}
            />
            <Typography variant="h6" fontWeight="bold">Users name</Typography>
          </Box>
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
  );
};
History.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default History;
