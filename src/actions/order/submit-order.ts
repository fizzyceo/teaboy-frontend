const submitOrder = async (order: any) => {
  const { order_items, customer_name, table_number } = order;
  const response = await fetch(
    `https://basseer-internship-backend-davh.onrender.com/order/create`,
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

  if (!response.ok) {
    return { success: false, error: data.error, data: data };
  }

  return { success: true, data: data };
};

export default submitOrder;
