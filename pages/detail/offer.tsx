import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Import icon

function OfferDetail() {
  return (
    <>
      <Stack>
        <Typography>Available offers</Typography>
        <Box display="inline-flex">
          <LocalOfferIcon fontSize="small" /> {/* Add icon */}
          <Typography> Được hoàn tiền 100% luôn đó bạn êiiiiiii</Typography>
        </Box>

        <Box display="inline-flex">
          <LocalOfferIcon fontSize="small" /> {/* Add icon */}
          <Typography> Được hoàn tiền 100% luôn đó bạn êiiiiiii</Typography>
        </Box>
        <Box display="inline-flex">
          <LocalOfferIcon fontSize="small" /> {/* Add icon */}
          <Typography> Được hoàn tiền 100% luôn đó bạn êiiiiiii</Typography>
        </Box>
      </Stack>
    </>
  );
}

export default OfferDetail;
