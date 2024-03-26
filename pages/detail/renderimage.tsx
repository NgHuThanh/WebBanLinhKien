import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer"; // Import icon

function RenderImage() {
  const repeatCount = 10; // Số lần lặp lại
  const boxes = Array.from({ length: repeatCount }, (_, index) => (
    <Box
      key={index}
      sx={{
        flex: "0 0 auto",
        marginRight: 0.5,
        width: "350px",
        height: "200px",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
    >
      <Box
        component="img"
        sx={{
          height: "100%",
          width: "auto",
          objectFit: "cover",
          borderRadius: "16px",
        }}
        src={`/noneDevice.jpg`}
        alt={"None"}
      />
    </Box>
  ));

  return (
    <Box
      sx={{
        paddingTop: "24px",
        display: "flex",
        overflowX: "auto",
        gap: 1,
        flexWrap: "nowrap",
        margin: "-14px",
        paddingLeft: "18px",
        paddingRight: "16px",
      }}
    >
      {boxes}
    </Box>
  );
}

export default RenderImage;
