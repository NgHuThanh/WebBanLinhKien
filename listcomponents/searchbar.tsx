import React from "react";
import InputBase from "@mui/material/InputBase";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const SearchBar = () => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("");
  };

  return (
    <Box
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "2px",
        width: "100%",
      }}
      onClick={handleSearchClick}
    >
      <InputBase
        sx={{
          borderRadius: "16px",
          background: "white",
          width: "100%",
          height: "42px",
          color: "black",
          padding: "30px",
          cursor: "pointer",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        }}
        placeholder="Try search here.."
        inputProps={{ "aria-label": "search" }}
      />
      <Box
        component="div" // Chọn loại thẻ HTML bạn muốn sử dụng (div, span, etc.)
        sx={{
          width: "15.807px",
          height: "16px",
          backgroundImage: 'url("/Search (1).png")', // Sử dụng backgroundImage thay vì backgroundColor
          backgroundSize: "cover", // Có thể điều chỉnh kiểu hiển thị ảnh
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default SearchBar;
