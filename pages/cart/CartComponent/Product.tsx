import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Cart } from "@/model/cart";
import { Product, productConverter } from "@/model/product";
import { getDoc } from "firebase/firestore";

interface ProductCartProps {
  cart: Cart;
}

const ProductCart: React.FC<ProductCartProps> = (props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const productRef = props.cart.product_id.withConverter(
          productConverter
        );
        const productData = await getDoc(productRef);
        setProduct(productData.data() as Product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data: ", error);
      }
    };
    getData();
  }, [props.cart.product_id]);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
  <Box sx={{width:"30%"}}>
    {product?.image && (
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%" }}
      />
    )}
  </Box>
  <Box sx={{ marginLeft: "20px" }}>
    <Typography>Name: {product?.name}</Typography>
    <Typography>Price: {product?.price}</Typography>
    <Typography>Discount: {product?.saleinfor}%</Typography>
  </Box>
</Box>

  );
};

export default ProductCart;
