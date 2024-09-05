const editMenu = async (menu_id: number, editedMenuData: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menu_id}`,
      {
        method: "Patch",
        body: JSON.stringify(editedMenuData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default editMenu;
