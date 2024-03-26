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
}) {
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
            }}
          >
            {" "}
            ?? rating
          </Typography>
        </Box>
        <Box display="inline-flex" alignItems="center">
          <Typography
            sx={{
              color: "dark",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            {props.price}$
          </Typography>
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              display: "inline-flex",
              alignItems: "center",
              fontSize: "15px",
              marginLeft: "auto",
            }}
          >
            <ShoppingCartSharpIcon></ShoppingCartSharpIcon>
            Add to cart now
          </Button>
        </Box>
      </Stack>
    </>
  );
}

export default InfomationDetail;
