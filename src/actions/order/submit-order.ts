const submitOrder = async (order: any) => {
  const { order_items, customer_name, table_number } = order;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/create`,
    {
      method: "POST",
      body: JSON.stringify({
        ...order,
        order_items,
        customer_name,
        table_number,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  console.log("after_order_submission:", data);

  if (!response.ok) {
    return { success: false, error: data.error, data: data };
  }

  return { success: true, data: data };
};

export default submitOrder;
