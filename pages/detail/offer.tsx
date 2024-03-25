import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Import icon

function OfferDetail(props: { offer: String }) {
  return (
    <>
      <Box
        sx={{
          borderTop: 1,
          borderColor: "grey.500",
          marginTop: "20px",
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
          Available offers
        </Typography>
        <Box
          display="inline-flex"
          sx={{
            marginTop: "10px",
          }}
        >
          <LocalOfferIcon fontSize="small" /> {/* Add icon */}
          <Typography> {props.offer}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default OfferDetail;
