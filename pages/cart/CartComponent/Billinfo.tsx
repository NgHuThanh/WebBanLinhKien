import { Grid, Typography } from "@mui/material";
import React from "react";

type Props = {
  deliveryDate: string;
  totalAmount: number;
  discount: number;
  shippingFee: number;
};

const Billinfo: React.FC<Props> = ({
  deliveryDate,
  totalAmount,
  discount,
  shippingFee,
}) => {
  const totalPrice = totalAmount - discount + shippingFee;
  <Billinfo
    deliveryDate="2024-03-17"
    totalAmount={100}
    discount={10}
    shippingFee={5}
  />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">Delivery date:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>{deliveryDate}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Total amount:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>${totalAmount}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Discount:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>${discount}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Shipping fee:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>${shippingFee}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Total price:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <b>${totalPrice}</b>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Billinfo;
