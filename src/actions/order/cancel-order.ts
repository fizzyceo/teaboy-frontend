const cancelOrder = async (orderId: string) => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/order/${orderId}/cancel`,
    {
      method: "POST",
    },
  );

  const data = await response.json();

  return data;
};

export default cancelOrder;
