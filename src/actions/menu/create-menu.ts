const createMenu = async (menu: any) => {
  if (!menu.name) {
    return null;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/create`,
    {
      method: "POST",
      body: JSON.stringify(menu),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  return data;
};

export default createMenu;
