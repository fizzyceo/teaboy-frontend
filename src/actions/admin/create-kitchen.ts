const createKitchen = async (name: string) => {
  const response = await fetch(
    `https://basseer-internship-backend-davh.onrender.com/kitchen/create`,
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
