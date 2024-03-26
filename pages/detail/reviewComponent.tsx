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

function ReviewComponent() {
  return (
    <>
      <Stack
        sx={{
          borderTop: 1,
          borderColor: "grey.500",
          marginTop: "20px",
          marginBottom: "10px",
          pt: "20px",
        }}
      >
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
          <Typography
            sx={{
              color: "dark",
              fontWeight: "bold",
              fontSize: "18px",
              marginLeft: "10px",
            }}
          >
            Super!
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "dark",
            fontSize: "18px",
            marginTop: "15px",
          }}
        >
          Finally something can fit to my PC setup. If there any new device from
          thi brand, i will no hesitation to buy it!!!
        </Typography>
        <Typography
          sx={{
            color: "#999",
          }}
        >
          User name
        </Typography>
        <Box display="inline-flex">
          <CheckCircleOutlineIcon
            sx={{
              color: "#999",
            }}
          ></CheckCircleOutlineIcon>
          <Typography
            sx={{
              color: "#999",
              fontSize: "15px",
            }}
          >
            Certified Buyer - 2 month ago
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default ReviewComponent;
