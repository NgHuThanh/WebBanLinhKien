import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar from "@/listcomponents/searchbar";
import Product1 from "@/listcomponents/product1";
import Categories from "@/listcomponents/categories";
import router from "next/router";
import Product3 from "@/listcomponents/product3";

const Cate = () => {
  return (
    <>
      <Button onClick={() => router.back()}>Back</Button>
      <SearchBar></SearchBar>
      <Categories></Categories>
      <Product3></Product3>
    </>
  );
};

export default Cate;
