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
      <Stack>
        <Typography>Similar product</Typography>
        <Box display="inline-flex">
          <Product />
          <Product />
        </Box>
      </Stack>
    </>
  );
}

export default SimilarProduct;
