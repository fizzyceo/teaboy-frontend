"use client";

import React from "react";

const OrderStatus = ({ params }: { params: { order_id: string } }) => {
  //fetch the order infos from the order id

  return <div>{params.order_id}</div>;
};

export default OrderStatus;
