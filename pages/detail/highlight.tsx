import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LabelImportantSharpIcon from "@mui/icons-material/LabelImportantSharp";
function HightLight() {
  return (
    <>
      <Stack
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
          Technical specifications
        </Typography>
        <Box sx={{ display: "inline-flex" }}>
          <LabelImportantSharpIcon />
          <Typography>Light laptop with out optional</Typography>
        </Box>
        <Box sx={{ display: "inline-flex" }}>
          <LabelImportantSharpIcon />
          <Typography>
            16 inch Quad HD Led Backlist IPS Retina Display 500nits Brightness,
            wide color P3, True tone Technology
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default HightLight;
