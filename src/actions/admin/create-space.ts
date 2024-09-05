const createSpace = async (values: any) => {
  const { site_id, name } = values;
  if (!site_id) {
    return null;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/site/${site_id}/spaces`,
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

export default createSpace;
