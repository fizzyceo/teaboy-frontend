const submitOrder = async (order: any) => {
  const { order_items, customer_name, table_number } = order;
  const response = await fetch(
    "https://basseer-internship-backend.onrender.com/order",
    {
      method: "POST",
      body: JSON.stringify({
        order_items,
        customer_name,
        table_number,
        payment_method: "CASH",
        payment_status: "PENDING",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    return { success: false, error: data.error, data: data };
  }

  return { success: true, data: data };
};

export default submitOrder;
