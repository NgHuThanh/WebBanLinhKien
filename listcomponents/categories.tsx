import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, Link } from "@mui/material";
import { Categories } from "@/model/categories";
import { getCategoriesData } from "@/pages/firebase/config2";

const Categori = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Đã đọc tới dòng 13");
        const categoriesListData = await getCategoriesData();
        setCategories(categoriesListData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories data: ", error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      sx={{ marginTop: "20px" }}
    >
      {" "}
      {categories.map((category, index) => (
        <Grid
          item
          xs={2}
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Link href={`categories/`} underline="none">
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
