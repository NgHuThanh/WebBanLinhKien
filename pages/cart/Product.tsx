import React from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {
  productActions,
  productSelectors,
} from "@/lib/features/product/productSlice";

type ProductProps = {
  id: string;
};

const Product = (props: ProductProps) => {
  // The `state` arg is correctly typed as `RootState` already
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, props.id)
  );
  const dispatch = useAppDispatch();

  if (!product) {
    return null;
  }

  const { id, qty } = product;
  const increase = () => {
    dispatch(
      productActions.updateValue({
        id: id,
        qty: qty + 1,
      })
    );
  };
  const addManual = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    dispatch(
      productActions.updateValue({
        id: id,
        qty: value,
      })
    );
  };

  const decrease = () => {
    dispatch(
      productActions.updateValue({
        id: id,
        qty: qty - 1,
      })
    );
  };

  return (
    <main>
      <Box py={8}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box
            component="img"
            src="https://lh3.googleusercontent.com/RgOfJby8hN56mGqT8WDHG65Y9iScPYqUdkLUsoUUzlkqAxUBa0bWEehSHX4nb0Y_cz782zORAImY6sS-JzvEU3mWR73MQkZzHA=w500-rw"
            width="30%"
          ></Box>
          <Stack spacing={2}>
            <Typography>ID: {id}</Typography>
            <Typography mr={4}>
              Apple iMac 24-Inch 4.5K Brand New | Apple M1 Chip | 8‑Core CPU |
              7‑Core GPU | 8GB RAM | 256GB SSD | Silver | PN: MGTF3LL/A
            </Typography>
            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                style={{ width: "88px" }}
                onClick={increase}
              >
                Cộng
              </Button>
              <TextField variant="outlined" value={qty} onChange={addManual} />
              <Button
                variant="contained"
                style={{ width: "88px" }}
                onClick={decrease}
              >
                Trừ
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </main>
  );
};

export default Product;
