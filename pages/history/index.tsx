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
            <Box>
                <Typography variant="h6" sx={{ color: 'navy', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Product bought
                </Typography>
                <Stack>
                    {orders.map((order: OrderDetail, index: number) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            <ProductOrder cart={order} />
                            <Box sx={{ alignItems: 'center' ,width:"35%"}}>
                                <Typography variant="body1" sx={{ marginRight: '10px' }}>Qty: {order.quantity}</Typography>
                                <Typography variant="body1" sx={{ marginRight: '10px' }}>Price: {order.price}$</Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Layout>
    );
};

export default History;
