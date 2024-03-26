import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import OfferDetail from "./offer";
import ReviewComponent from "./reviewComponent";

function RatingReview() {
  return (
    <>
      <Stack
        sx={{
          borderTop: 1,
          borderColor: "grey.500",
          marginTop: "20px",
          marginBottom: "0px",
          pt: "20px",
        }}
      >
        <Typography
          sx={{
            color: "dark",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Ratings & reviews
        </Typography>
      </Stack>
      <ReviewComponent />
      <ReviewComponent />
    </>
  );
}

export default RatingReview;
