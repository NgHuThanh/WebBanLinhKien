import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import router from "next/router";

import Product4 from "@/listcomponents/product4";

const Cate = () => {
  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <Product4></Product4>
    </>
  );
};

export default Cate;
