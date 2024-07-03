const getMenu = async (menu_id: number) => {
  console.log(menu_id);
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/menu/${menu_id}`
  );

  const menu = await response.json();

  console.log(menu);
  return menu;
};

export default getMenu;
