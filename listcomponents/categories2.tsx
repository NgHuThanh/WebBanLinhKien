import React from "react";
import { Box, Grid, Link, Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Categories } from "@/model/categories"; // Import kiểu dữ liệu Categories từ module '@/model/categories'

interface CategoriProps {
  categories: Categories[]; // Chỉ định kiểu dữ liệu cho prop categories
}

const Categori: React.FC<CategoriProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (idcategories: string) => {
    navigate(`/products/${idcategories}`);
  };

  return (
    <Grid container spacing={1} justifyContent="center" marginTop="20px">
      {categories.map((category, index) => (
        <Grid item xs={2} key={index}>
          <Link
            underline="none"
            onClick={() => handleCategoryClick(category.id!)}
          >
            <Card sx={{ maxWidth: "100%" }}>
              <CardMedia
                component="img"
                height="100%"
                width="100%"
                image={category.cateimage}
                alt={category.name}
              />
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categori;
