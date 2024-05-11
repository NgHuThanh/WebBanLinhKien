import React, { useEffect, useState, useCallback } from "react";
import InputBase from "@mui/material/InputBase";
import { useRouter } from "next/router";
import { Box, Card, CardContent, CardMedia, Grid, Link, Stack, Typography } from "@mui/material";
import { Product } from "@/model/product";
import { getProductData } from "../../firebase/config";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Layout from "@/landingPage/layout";

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const productListData = await getProductData();
      const filteredProducts = productListData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, fetchData]);

  const handleSearchClick = () => {
    router.push("");
  };

  if (loading) {
    return <Box>Loading...</Box>; // Hiển thị thông báo tải dữ liệu
  }

  return (
    <Layout>
      <Stack>
        <Box
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            padding: "2px",
            width: "100%",
          }}
          onClick={handleSearchClick}
        >
          <InputBase
            sx={{
              borderRadius: "16px",
              background: "white",
              width: "100%",
              height: "42px",
              color: "black",
              padding: "30px",
              cursor: "pointer",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
            placeholder="Try search here.."
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box
            component="div"
            sx={{
              width: "15.807px",
              height: "16px",
              backgroundImage: 'url("/Search (1).png")',
              backgroundSize: "cover",
              position: "absolute",
              top: "50%",
              right: "15px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          />
        </Box>
        <Box>
          <Box>
            <h2>Search result</h2>
          </Box>
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Link href={`/detail/${product.id}`} underline="none">
                  <Card
                    sx={{
                      maxWidth: 300,
                      minHeight: 300,
                      backgroundColor: "#ffffff",
                      color: "#000000",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image}
                      alt={product.image}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent style={{ maxHeight: "120px", overflow: "hidden" }}>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          fontSize: "16px",
                          fontWeight: "bold",
                          minHeight: "50px",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="black"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {(product.price * (1 - product.saleinfor / 100)).toFixed(0)}
                        $
                        <Typography
                          style={{
                            marginLeft: "5px",
                            color: "grey",
                            display: "flex",
                            fontSize: "14px",
                            textDecoration: "line-through",
                          }}
                        >
                          {product.price}$
                        </Typography>
                        <Typography
                          color="green"
                          style={{
                            marginLeft: "5px",
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {product.saleinfor}% off
                        </Typography>
                      </Typography>

                      <Typography
                        variant="body2"
                        color="black"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          fontSize: "12px",
                          fontWeight: "bold",
                          paddingTop: "10px",
                        }}
                      >
                        <LocalOfferIcon fontSize="inherit" /> {product.offer}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Layout>
  );
};

export default Search;
