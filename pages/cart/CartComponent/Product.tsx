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
  const [test, setTest] = useState<String | null>(null);
  useEffect(() => {
    const getData = async () => {
      let productRef = props.cart.product_id.withConverter(productConverter);
      let productData = await getDoc(productRef);
      setProduct(productData.data() as Product);
    };
    getData();
  }, [product?.name, props.cart.product_id]);
  return (
    <Box>
      <Box>
        <Typography>Name:{product?.name}</Typography>
        <Typography>Price:{product?.price}</Typography>
        <Typography>Image:{product?.image}</Typography>
      </Box>
    </Box>
  );
}

export default ProductCart;
