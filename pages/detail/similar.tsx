import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import ProductSimilar from "./similarProductComponent";
import { Product } from "@/model/product";

function SimilarProduct(props: { products?: Product[] }) {
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
          {props.products?.slice(0, 2).map((product) => (
            // eslint-disable-next-line react/jsx-key
            <ProductSimilar product={product}></ProductSimilar>
          ))}
        </Box>
      </Stack>
    </>
  );
}

export default SimilarProduct;
