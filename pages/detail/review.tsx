import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import OfferDetail from "./offer";
import ReviewComponent from "./reviewComponent";

function RatingReview() {
  return (
    <>
      <Stack>
        <Typography>Ratings & reviews</Typography>
        <Box
          component="img"
          sx={{
            height: "240px",
            width: "100%",
          }}
          src={`/noneDevice.jpg`}
        />
      </Stack>
      <ReviewComponent />
      <ReviewComponent />
    </>
  );
}

export default RatingReview;
