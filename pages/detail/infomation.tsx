import React from "react";
import { Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MAX_LENGTH = 150;

function InfomationDetail(props: {
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
}) {
  // Kiểm tra xem props.name có tồn tại không trước khi gán cho biến text
  const text = props.name ? props.name : ""; // Nếu không tồn tại, gán giá trị mặc định là chuỗi rỗng

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
      <Typography
        sx={{
          color: "dark",
          fontSize: "24px",
          mt: "20px",
          whiteSpace: "pre-line",
          fontWeight: "bold",
        }}
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
      <Typography
        sx={{
          color: "dark",
          fontWeight: "bold",
          fontSize: "20px",

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
        }}
      >
        {props.discount}%off
      </Typography>
    </>
  );
}

export default InfomationDetail;
