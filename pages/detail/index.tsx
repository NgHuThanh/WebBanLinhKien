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

const Detail: NextPageWithLayout = () => {
  return (
    <>
      <Stack>
        <SliceDetail />
        <InfomationDetail />
        <OfferDetail />
        <HightLight />
        <RatingReview />
        <Button>Add to cart now</Button>
        <SimilarProduct />
      </Stack>
    </>
  );
};

export default Detail;
