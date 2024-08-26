const createKitchen = async (name: string) => {
  const response = await fetch("http://localhost:8000/kitchen/create", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export default createKitchen;
