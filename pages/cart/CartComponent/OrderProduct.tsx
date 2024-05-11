import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  productActions,
  productSelectors,
} from "@/lib/features/product/productSlice";
import { Cart } from "@/model/cart";
import { Product, productConverter } from "@/model/product";
import { getDoc } from "firebase/firestore";
import { get1ProductData } from "@/pages/firebase/config";
import { OrderDetail } from "@/model/order";

interface ProductOrder {
  cart: OrderDetail;
}

const ProductOrder: React.FC<ProductOrder> = (props) => {
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("Lập ở dòng 19 product cart");
    
    const getData2 = async () => {
      try {
        const productRef = props.cart.product_id.withConverter(productConverter);
        const productData = await getDoc(productRef);
        console.log("Product data:", productData.data()?.name);
        setProduct(productData.data() as Product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    };
      // if(props.cart.product_id==null){
      //   console.log("Khong tiem thay");
      // }
      // const productRef = props.cart.product_id.withConverter(productConverter);
      // const productData = await getDoc(productRef);
      // setProduct(productData.data() as Product);
      
      // console.log("name:"+productData.data()?.name)
      // setLoading(false);
      // console.log("Lập ở dòng 26 product cart");
    
    getData2();
  }, [props.cart.product_id]);
  if (loading) {
    return <Box>Loading...</Box>; // Hiển thịstshôngss báo tải dữ liệu
  }
  if(product==null){
    console.log("Khong ra duoc san pham o order")
  }
  console.log("Lập ở dòng 27 product cart");
  return (
    <Box>
      <Box>
        <Typography>Name:{product?.name}</Typography>
        <Typography>Price:{product?.price}</Typography>
        <Typography>Discount:{product?.saleinfor}%</Typography>
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "30%" }}
          />
        )}
      </Box>
    </Box>
  );
}


export default ProductOrder;

// export function ProductOrder(props: { cart: OrderDetail }) {
//   const [product, setProduct] = useState<Product | null>(null);

//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     console.log("Lập ở dòng 19 product cart");
//     const getData = async () => {
//       let productRef = props.cart.product_id.withConverter(productConverter);
//       let productData = await getDoc(productRef);
//       setProduct(productData.data() as Product);
//       setLoading(false);
//       console.log("Lập ở dòng 26 product cart");
//     };
//     getData();
//   }, [props.cart.product_id]);
//   if (loading) {
//     return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
//   }
//   console.log("Lập ở dòng 27 product cart");
//   return (
//     <Box>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <img src={product?.image} alt={"/none"} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//               <Typography variant="body1">name:{product?.name}</Typography>
//       </Box>
//     </Box>
//   );
// }







// export default ProductCart;
// export function ProductOrder(props: { cart: OrderDetail }) {
//   const [product, setProduct] = useState<Product | null>(null);

//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     console.log("Lập ở dòng 19 product cart");
//     const getData = async () => {
//       let productRef = props.cart.product_id.withConverter(productConverter);
//       let productData = await getDoc(productRef);
//       setProduct(productData.data() as Product);
//       setLoading(false);
//       console.log("Lập ở dòng 65 product cart");
//     };
//     getData();
//   }, [props.cart.product_id]);
//   if (loading) {
//     return <Box>Loading...</Box>; // Hiển thị thôngs báo tải dữ liệu
//   }
//   console.log("Lập ở dòng 27 product cart");
//   return (
//     <Box>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <img src={product?.image} alt={"/none"} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//               <Typography variant="body1">name:{product?.name}</Typography>
//       </Box>
//     </Box>
//   );
// }

