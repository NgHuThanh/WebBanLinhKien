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
        <Card sx={{ maxWidth: 700 }}>
          <CardMedia
            component="img"
            height="240"
            image={props.image ? (props.image as string) : "/noneDevice.jpg"}
            alt={"Ảnh 6"}
          />
        </Card>
      </Box>
    </>
  );
}

export default SliceDetail;
