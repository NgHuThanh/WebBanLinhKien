import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const MAX_LENGTH = 150;
function InfomationDetail(props: {
  name?: String;
  description?: String;
  price?: number;
  discount?: number;
}) {
  const text = props.name as string;
  const [expanded, setExpanded] = React.useState(false);

  // Kiểm tra xem nội dung có dài hơn độ dài tối đa hay không
  const isTruncated = text.length > MAX_LENGTH;

  // Lấy phần nội dung được cắt hoặc toàn bộ nội dung nếu đã mở rộng
  const truncatedText = expanded ? text : text.slice(0, MAX_LENGTH);

  const priceNow = props.price
    ? props.price - (props.price * (props.discount || 0)) / 100
    : 0;
  return (
    <>
      <Stack>
        <Typography
          sx={{ color: "dark", fontSize: "18px", whiteSpace: "pre-line" }}
        >
          {truncatedText}
        </Typography>
        {/* Nếu nội dung quá dài và chưa mở rộng, hiển thị nút 'Hiển thị thêm' */}
        {isTruncated && !expanded && (
          <Button
            onClick={() => setExpanded(true)}
            endIcon={<ExpandMoreIcon />}
            sx={{ color: "primary.main" }}
          >
            Hiển thị thêm
          </Button>
        )}
        <Box
          sx={{
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              display: "inline-flex",
              alignItems: "center",
              fontSize: "15px",
            }}
          >
            <Typography
              sx={{
                color: "white",
              }}
            >
              5.0
            </Typography>
            <StarIcon />
          </Button>

          <Typography
            sx={{
              color: "#999",
              ml: "10px",
            }}
          >
            {" "}
            99 rating
          </Typography>
        </Box>
        <Box display="inline-flex">
          <Typography
            sx={{
              color: "dark",
              fontWeight: "bold",
              fontSize: "30px",
              ml: "10px",
              display: "block",
            }}
          >
            {priceNow}$
          </Typography>
          <Typography
            sx={{
              color: "#888",
              fontWeight: "bold",
              fontSize: "20px",
              textDecoration: "line-through",
              ml: "10px",
              pt: "10px",
              display: "inline",
            }}
          >
            {props.price}$
          </Typography>
          <Typography
            sx={{
              color: "green",
              fontWeight: "bold",
              fontSize: "20px",
              ml: "10px",
              display: "inline",
              pb: "0px",
              pt: "10px",
            }}
          >
            {props.discount}%off
          </Typography>
        </Box>
      </Stack>
    </>
  );
}

export default InfomationDetail;
