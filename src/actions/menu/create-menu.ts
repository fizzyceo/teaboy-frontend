const createMenu = async (menu: any) => {
  if (!menu.name) {
    return null;
  }
  const response = await fetch(
    `https://basseer-internship-backend-davh.onrender.com/menu/create`,
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
