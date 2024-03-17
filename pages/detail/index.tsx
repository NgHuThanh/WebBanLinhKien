import React from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import { Stack } from "@mui/material";
import SliceHome from "./slice";

const Detail: NextPageWithLayout = () => {
  return (
    <>
      <Stack>
        <SliceHome />
      </Stack>
    </>
  );
};

export default Detail;
