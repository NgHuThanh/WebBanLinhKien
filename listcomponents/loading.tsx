import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import LabelImportantSharpIcon from "@mui/icons-material/LabelImportantSharp";
function Loading() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Sử dụng chiều cao của viewport
        }}
      >
        <CircularProgress size={100} thickness={5} />
      </Box>
      ;
    </>
  );
}

export default Loading;
