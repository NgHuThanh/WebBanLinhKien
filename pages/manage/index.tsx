import React, { useEffect, useState } from "react";
import router from "next/router";
import { NextPageWithLayout } from "../_app";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";

import {
  addToCart,
  getProductData,
  handleAddRandomProduct,
  writeExample,
} from "../firebase/config";
import { Product } from "@/model/product";

const Manage: NextPageWithLayout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getData = async () => {
      setProducts(await getProductData());
    };
    getData();
  }, []);
  return (
    <>
      <Stack>
        <Typography>Đây là giao diện quản lý</Typography>
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "15px",
            marginLeft: "auto",
            width: "100%",
          }}
          onClick={() => {
            handleAddRandomProduct(); // Chuyển đối số product vào hàm addToCart
          }}
        >
          <ShoppingCartSharpIcon />
          Create Product
        </Button>
        <List>
          {products.map((product) => (
            <ListItem key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline", marginRight: 1 }}
                      component="span"
                      variant="body2"
                      color="#888"
                    >
                      Price: ${product.price}
                    </Typography>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="#299"
                    >
                      Offer: {product.offer}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default Manage;
