import React from 'react';
import { Grid, Typography } from '@mui/material';

type Props = {
  deliveryDate: string;
  totalAmount: number;
  discount: number;
  shippingFee: number;
};

const Billinfo: React.FC<Props> = ({ deliveryDate, totalAmount, discount, shippingFee }) => {
  const totalPrice = totalAmount - discount + shippingFee;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body1">Delivery date:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">{deliveryDate}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Total amount:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">${totalAmount}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Discount:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">${discount}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Shipping fee:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">${shippingFee}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Total price:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">${totalPrice}</Typography>
      </Grid>
   </Grid>
  );
};

export default Billinfo;
