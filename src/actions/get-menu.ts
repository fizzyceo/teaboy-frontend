const getMenu = async (menu_id: number) => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/menu/${menu_id}`,
    { cache: "no-store" }
  );
  const menu = await response.json();
  return menu;
};

export default getMenu;
