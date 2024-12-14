const getOrderDetails = async (order_number: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/order/number/${order_number}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
};

export default getOrderDetails;
