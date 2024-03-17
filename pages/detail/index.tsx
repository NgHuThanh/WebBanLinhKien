import React from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Button, Stack } from "@mui/material";
import SliceDetail from "./slice";
import InfomationDetail from "./infomation";
import OfferDetail from "./offer";
import HightLight from "./highlight";
import RatingReview from "./review";
import SimilarProduct from "./similar";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import RenderImage from "./renderimage";

const Detail: NextPageWithLayout = () => {
  return (
    <>
      <Stack sx={{ padding: "10px" }}>
        <SliceDetail />
        <InfomationDetail />
        <RenderImage />
        <OfferDetail />
        <HightLight />
        <RatingReview />
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            display: "inline-flex",
            alignItems: "center",
            fontSize: "15px",
            marginLeft: "auto",
            width: "100%",
          }}
        >
          <ShoppingCartSharpIcon></ShoppingCartSharpIcon>
          Add to cart now
        </Button>
        <SimilarProduct />
      </Stack>
    </>
  );
};

export default Detail;
