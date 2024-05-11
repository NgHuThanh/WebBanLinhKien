import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

function SliceDetail(props: { image?: String }) {
  return (
    <>
      <Box>
        <Box
          component="img"
          width="100%"
          src={props.image ? (props.image as string) : "/noneDevice.jpg"}
          alt="Ảnh 6"
          sx={{ borderRadius: 5 }} // Loại bỏ viền
        />
      </Box>
    </>
  );
}

export default SliceDetail;
