import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Product from "./similarProductComponent";

function SimilarProduct() {
  return (
    <>
      <Stack
        sx={{
          pt: "20px",
        }}
      >
        <Typography
          sx={{
            color: "dark",
            fontWeight: "bold",
            fontSize: "28px",
            mb: "20px",
          }}
        >
          Similar product
        </Typography>
        <Box display="inline-flex">
          <Product />
          <Product />
        </Box>
      </Stack>
    </>
  );
}

export default SimilarProduct;
