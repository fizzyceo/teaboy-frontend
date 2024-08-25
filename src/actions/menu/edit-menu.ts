const editMenu = async (menu_id: number, editedMenuData: any) => {
  try {
    const response = await fetch(`http://localhost:8000/menu/${menu_id}`, {
      method: "Patch",
      body: JSON.stringify(editedMenuData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default editMenu;