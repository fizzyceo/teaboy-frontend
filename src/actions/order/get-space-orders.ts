const getSpaceOrders = async (space_id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v2/order/space/${space_id}`,
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

export default getSpaceOrders;
