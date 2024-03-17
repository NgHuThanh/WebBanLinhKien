import { Box, Card, CardContent, Link, Typography } from "@mui/material";

function SliceHome() {
  return (
    <>
      <Box>
        <Box
          component="img"
          sx={{
            height: "240px",
            width: "100%",
          }}
          src={`/noneDevice.jpg`}
        />
      </Box>
    </>
  );
}

export default SliceHome;
