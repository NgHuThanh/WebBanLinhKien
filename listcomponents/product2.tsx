import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Product2 = () => {
  const products = [
    {
      name: "Product 1",
      image: "/mau.png",
      description: "Description of product 1",
    },
    {
      name: "Product 2",
      image: "/mau.png",
      description: "Description of product 2",
    },
    {
      name: "Product 3",
      image: "/mau.png",
      description: "Description of product 3",
    },
    {
      name: "Product 4",
      image: "/mau.png",
      description: "Description of product 4",
    },
  ];

  return (
    <Box>
      <Box>
        <h2>Top Deals on Electronics</h2>
      </Box>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product2;
