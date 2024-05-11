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
      <Stack sx={{ width: "50%",margin:1, // Adding border radius
            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.5)", // Adding shadow
            border: "1px solid #e0e0e0" }}>
        <Box
          component="img"
          sx={{
            height: "200px",
            width: "100%",
            minHeight: 200,
            
          }}
          src={props.product?.image}
        />
        <Box sx={{padding:1}}>
        <Typography sx={{ minHeight: 50,fontWeight:"bold"}}>{props.product?.name}</Typography>
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
        </Box>
        
      </Stack>
    </>
  );
}

export default ProductSimilar;
