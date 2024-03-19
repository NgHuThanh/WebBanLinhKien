import React from 'react';

type Props = {
  deliveryDate: string;
  totalAmount: number;
  discount: number;
  shippingFee: number;
};

const Billinfo: React.FC<Props> = ({ deliveryDate, totalAmount, discount, shippingFee }) => {
  const totalPrice = totalAmount - discount + shippingFee;
  <Billinfo deliveryDate="2024-03-17" totalAmount={100} discount={10} shippingFee={5} />


  return (
    <div>
      <div>Delivery date: {deliveryDate}</div>
      <div>Total amount: ${totalAmount}</div>
      <div>Discount: ${discount}</div>
      <div>Shipping fee: ${shippingFee}</div>
      <div>Total price: ${totalPrice}</div>
    </div>
  );
};

export default Billinfo;
