import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Categories = () => {
  // Dữ liệu hình ảnh mẫu
  const images = [
    "/laptop.png",
    "/phone.png",
    "/camera.png",
    "/headphone.png",
    "/accessories.png",
  ];

  const settings = {
    speed: 500, // Tốc độ chuyển đổi của slider (ms)
    infinite: true, // Cho phép trượt vô hạn qua các hình ảnh

    slidesToShow: 5, // Số lượng hình ảnh được hiển thị cùng một lúc
    slidesToScroll: 5, // Số lượng hình ảnh được trượt mỗi lần
  };

  return (
    <Box>
      <Box>
        <h2>Catergories</h2>
      </Box>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Box
              sx={{
                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                marginRight: "10px",
              }}
            >
              <Image
                src={image}
                alt={`Hình ảnh ${index + 1}`}
                width={65}
                height={65}
              />
            </Box>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Categories;
