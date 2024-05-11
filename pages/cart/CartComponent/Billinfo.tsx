import React from "react";
import { Grid, Typography } from "@mui/material";

type Props = {
  
  totalAmount: number;
  discount: number;
  shippingFee: number;
};

const Billinfo: React.FC<Props> = ({
  
  totalAmount,
  discount,
  shippingFee,
}) => {
  const totalPrice = totalAmount - discount + shippingFee;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="body1">Total amount:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          <b>{totalAmount}$</b>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Discount:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          <b>{discount}$</b>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Shipping fee:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          <b>{shippingFee}$</b>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">Total price:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          <b>{totalPrice}$</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Billinfo;
