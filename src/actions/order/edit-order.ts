const EditOrderItem = async (order_item_id: number, orderItem: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${order_item_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderItem),
    },
  );
  return response.json();
};
export default EditOrderItem;
