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

function Product() {
  return (
    <>
      <Stack>
        <Box display="inline-flex">
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
        </Box>
        <Box
          component="img"
          sx={{
            height: "140px",
            width: "100%",
          }}
          src={`/noneDevice.jpg`}
        />
        <Typography>Finally something can fit to my PC setup</Typography>
        <Box display="inline-flex">
          <Typography
            sx={{
              color: "dark",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            999999$
          </Typography>
          <Typography
            sx={{
              color: "#999",
              textDecoration: "line-through",
              fontSize: "15px",
            }}
          >
            8888$
          </Typography>
          <Typography
            sx={{
              color: "green",

              fontSize: "15px",
            }}
          >
            8888$
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default Product;
