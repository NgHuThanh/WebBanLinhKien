import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAccountIcon from "@/listcomponents/iconAccount";
import ProductOrder from "../cart/CartComponent/OrderProduct";
import Loading from "@/listcomponents/loading";
import Layout from "@/landingPage/layout";
import { getCookie } from "cookies-next";
import { getOrderData } from "../firebase/config";
import { OrderDetail } from "@/model/order";

const History = () => {
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        async function fetchData() {
            try {
                const user_id = getCookie("user_id");
                if (!user_id) {
                    router.push("/login");
                    return;
                }
                const orderDetailListData = await getOrderData();
                setOrders(orderDetailListData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data: ", error);
            }
        }
        fetchData();
    }, [router]);

    if (loading) {
        return 
        <Layout><Loading /></Layout>; // Hiển thị thông báo tải dữ liệu
    }
    
    return (
        <Layout>
          <AddAccountIcon/>
            <Box sx={{alignItems:"center"}}>
                <Typography sx={{ color: 'black', fontSize: '30px', fontWeight: 'bold',textAlign:"center" }}>
                    History buying
                </Typography>
                <Stack sx={{backgroundColor:"#FFF"}}>
                    {orders.map((order: OrderDetail, index: number) => (
                        <Box
                        key={index}
                        sx={{
                          backgroundColor:"#FFF",
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #ccc',
                          padding: '10px',
                          boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.6)', // Adding shadow
                          marginBottom: '10px', // Adding margin bottom
                        }}
                        >
                        <ProductOrder cart={order} />
                        
                        <Box sx={{ borderTop: '1px solid gray', paddingTop: '10px' }}> {/* Add borderTop and paddingTop */}
                            <Typography variant="body1" sx={{ marginRight: '10px' }}>{order.quantity} product</Typography>
                            <Typography variant="body1" sx={{ marginRight: '10px' }}>Total: {order.price}$</Typography>
                        </Box>
                      </Box>
                      
                    ))}
                </Stack>
            </Box>
        </Layout>
    );
};

export default History;
