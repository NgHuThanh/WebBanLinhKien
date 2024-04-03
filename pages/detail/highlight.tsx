import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import LabelImportantSharpIcon from "@mui/icons-material/LabelImportantSharp";
function HightLight(props: { hightLight?: String }) {
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
          <Typography>{props?.hightLight}</Typography>
        </Box>
      </Stack>
    </>
  );
}

export default HightLight;
