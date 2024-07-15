const EditOrderItem = async (order_item_id: number, orderItem: any) => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/order-item/${order_item_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderItem),
    }
  );
  return response.json();
};
export default EditOrderItem;
