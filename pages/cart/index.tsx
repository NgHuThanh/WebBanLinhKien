import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import Address from './CartComponent/Address';
import { productActions, productSelectors } from '@/lib/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Product from './CartComponent/Product';
import Billinfo from './CartComponent/Billinfo'; // Import Billinfo component

const Cart = () => {

  const cartNumber = 2;

  const handleBack = () => {
    window.history.back();
  }
  const productsIds = useAppSelector((state) =>
    productSelectors.selectIds(state),
  )
  const appDispatch = useAppDispatch()
  const add = () => {
    appDispatch(productActions.addProduct({ initialValue: 1 }))
  }

  return (
    <main>
      <Box display="flex" alignItems="center">
        <Button onClick={handleBack}>&lt;</Button>
        <Typography variant="body1" ml={1}>Cart ({cartNumber})</Typography>
      </Box>
      <Address />
      <Button variant='contained' onClick={add}>
          Add
      </Button>
      <Box py={8}>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {productsIds.map((id) => (
            <Product key={id} id={id} />
          ))}
        </Stack>
      </Box>
      <Billinfo deliveryDate={''} totalAmount={0} discount={0} shippingFee={0} /> 
    </main>
  );
};

export default Cart;
