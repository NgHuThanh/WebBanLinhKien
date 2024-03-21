import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar from "@/listcomponents/searchbar";
import Product1 from "@/listcomponents/product1";
import Categories from "@/listcomponents/categories";
import Product2 from "@/listcomponents/product2";

const Home = () => {
  return (
    <>
      <SearchBar></SearchBar>
      <Product1></Product1>
      <Categories></Categories>
      <Product2></Product2>
    </>
  );
};

export default Home;
