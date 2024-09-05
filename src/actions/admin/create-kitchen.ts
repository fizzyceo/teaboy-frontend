const createKitchen = async (name: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/kitchen/create`,
    {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return data;
};

export default createKitchen;
