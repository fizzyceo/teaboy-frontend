const createMenu = async (menu: any) => {
  const menuToCreate = {
    name: menu.name || "",
    ask_for_name: menu.ask_for_name || false,
    ask_for_table: menu.ask_for_table || false,
  };
  const response = await fetch("http://localhost:8000/menu/create", {
    method: "POST",
    body: JSON.stringify(menuToCreate),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export default createMenu;
