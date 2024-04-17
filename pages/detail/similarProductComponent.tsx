import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Import icon
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import { Product } from "@/model/product";

function ProductSimilar(props: { product?: Product }) {
  return (
    <>
      <Stack sx={{ width: "50%" }}>
        <Box
          component="img"
          sx={{
            height: "200px",
            width: "100%",
            minHeight: 200,
          }}
          src={props.product?.image}
        />
        <Typography sx={{ minHeight: 50 }}>{props.product?.name}</Typography>
        <Box display="inline-flex">
          <Typography
            sx={{
              color: "dark",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {props.product?.price}$
          </Typography>

          <Typography
            sx={{
              color: "green",

              fontSize: "15px",
              ml: "20px",
            }}
          >
            {props.product?.saleinfor} % off
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default ProductSimilar;
