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

function ProductCart(props: { cart: Cart }) {
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Lập ở dòng 19 product cart");
    const getData = async () => {
      let productRef = props.cart.product_id.withConverter(productConverter);
      let productData = await getDoc(productRef);
      setProduct(productData.data() as Product);
      setLoading(false);
      console.log("Lập ở dòng 26 product cart");
    };
    getData();
  }, [props.cart.product_id]);
  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }
  console.log("Lập ở dòng 27 product cart");
  return (
    <Box>
      <Box>
        <Typography>Name:{product?.name}</Typography>
        <Typography>Price:{product?.price}</Typography>
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "10%" }}
          />
        )}
      </Box>
    </Box>
  );
}

export default ProductCart;
