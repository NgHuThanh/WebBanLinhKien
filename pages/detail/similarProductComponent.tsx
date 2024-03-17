import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Import icon
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function Product() {
  return (
    <>
      <Stack>
        <Box display="inline-flex">
          <Box>0.0 *</Box>
        </Box>
        <Box
          component="img"
          sx={{
            height: "240px",
            width: "100%",
          }}
          src={`/noneDevice.jpg`}
        />
        <Typography>
          Finally something can fit to my PC setup. If there any new device from
          thi brand, i will no hesitation to buy it!!!
        </Typography>
        <Box display="inline-flex">
          <Typography>999999$</Typography>
          <Typography>8888$</Typography>
          <Typography>77$</Typography>
        </Box>
      </Stack>
    </>
  );
}

export default Product;
