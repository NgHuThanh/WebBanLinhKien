import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Import icon
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function OfferDetail() {
  return (
    <>
      <Stack>
        <Box display="inline-flex">
          <Box>0.0 *</Box>
          <Typography>Super!</Typography>
        </Box>
        <Typography>
          Finally something can fit to my PC setup. If there any new device from
          thi brand, i will no hesitation to buy it!!!
        </Typography>
        <Typography>User name</Typography>
        <Typography>
          <CheckCircleOutlineIcon />
          Certified Buyer - 2 month ago
        </Typography>
      </Stack>
    </>
  );
}

export default OfferDetail;
