const cancelOrder = async (orderId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${orderId}/cancel`,
    {
      method: "POST",
    },
  );

  const data = await response.json();

  return data;
};

export default cancelOrder;
