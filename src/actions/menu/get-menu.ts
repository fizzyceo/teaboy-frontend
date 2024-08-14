const getMenu = async (menu_id: number, space_id: number = 1) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${menu_id}?space_id=${space_id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const menu = await response.json();
    console.log("fetched_menu:", menu);
    return menu;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return null;
  }
};

export default getMenu;
