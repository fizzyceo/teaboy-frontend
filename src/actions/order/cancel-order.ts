const cancelOrder = async (order_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/${order_id}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    return { success: false, error: data.error, data: data };
  }

  return { success: true, data: data };
};

export default cancelOrder;
