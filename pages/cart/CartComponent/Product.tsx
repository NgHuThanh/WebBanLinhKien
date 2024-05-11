import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Cart } from "@/model/cart";
import { Product, productConverter } from "@/model/product";
import { getDoc } from "firebase/firestore";
import { get1ProductData } from "@/pages/firebase/config";
import { OrderDetail } from "@/model/order";

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
        console.log("name:"+productData.data()?.name)
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
      <Box sx={{ width: "30%" }}>
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", borderRadius: 10 }}
          />
        )}
      </Box>
      <Box sx={{ marginLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{fontWeight:"bold",color:"gray" }}>{product?.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          
          <Typography sx={{ fontWeight:"bold" }}>{product?.price} $</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Discount: </Typography>
          <Typography sx={{ marginLeft: "5px",fontWeight:"bold",color:"green" }}>{product?.saleinfor}%</Typography>
        </Box>
      </Box>
    </Box>

  );
};

export default ProductCart;
export function ProductOrder(props: { cart: OrderDetail }) {
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

