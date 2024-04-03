import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
function InfomationDetail(props: {
  name?: String;
  description?: String;
  price?: number;
  discount?: number;
}) {
  const priceNow = props.price
    ? props.price - (props.price * (props.discount || 0)) / 100
    : 0;
  return (
    <>
      <Stack>
        <Typography
          sx={{
            color: "dark",

            fontSize: "18px",
          }}
        >
          {props.name}
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              display: "inline-flex",
              alignItems: "center",
              fontSize: "15px",
            }}
          >
            <Typography
              sx={{
                color: "white",
              }}
            >
              5.0
            </Typography>
            <StarIcon />
          </Button>

          <Typography
            sx={{
              color: "#999",
              ml: "10px",
            }}
          >
            {" "}
            99 rating
          </Typography>
        </Box>
        <Box display="inline-flex">
          <Typography
            sx={{
              color: "dark",
              fontWeight: "bold",
              fontSize: "30px",
              ml: "10px",
              display: "block",
            }}
          >
            {priceNow}$
          </Typography>
          <Typography
            sx={{
              color: "#888",
              fontWeight: "bold",
              fontSize: "20px",
              textDecoration: "line-through",
              ml: "10px",
              pt: "10px",
              display: "inline",
            }}
          >
            {props.price}$
          </Typography>
          <Typography
            sx={{
              color: "green",
              fontWeight: "bold",
              fontSize: "20px",
              ml: "10px",
              display: "inline",
              pb: "0px",
              pt: "10px",
            }}
          >
            {props.discount}%off
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default InfomationDetail;
