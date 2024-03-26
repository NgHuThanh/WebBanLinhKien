import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Product1 = () => {
  // Dữ liệu hình ảnh mẫu
  const images = ["/cover1.png", "/cover3.png", "/cover2.png"];

  const settings = {
    dots: true, // Hiển thị các điểm chỉ mục ở dưới slider
    infinite: true, // Cho phép trượt vô hạn qua các hình ảnh
    speed: 500, // Tốc độ chuyển đổi của slider (ms)
    slidesToShow: 1, // Số lượng hình ảnh được hiển thị cùng một lúc
    slidesToScroll: 1, // Số lượng hình ảnh được trượt mỗi lần
  };

  return (
    <Box>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Box
              sx={{
                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "20px",
                marginRight: "10px",
              }}
            >
              <Image
                src={image}
                alt={`Hình ảnh ${index + 1}`}
                width={400}
                height={200}
              />
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Product1;
