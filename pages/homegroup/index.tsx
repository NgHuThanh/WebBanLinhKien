import React, { ReactElement } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SearchBar from "@/listcomponents/searchbar";
import Product1 from "@/listcomponents/product1";
import Categories from "@/listcomponents/categories";
import Product2 from "@/listcomponents/product2";
import AddAccountIcon from "@/listcomponents/iconAccount";
import Layout from "@/landingPage/layout";


const Home = () => {
  return (
    <>
    {/* <AddAccountIcon/> */}
      <SearchBar></SearchBar>
      
      <Categories></Categories>
      <Product2></Product2>
    </>
  );
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Home;
