import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import router from "next/router";

const orders = () => {
  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
    </>
  );
};

export default orders;
