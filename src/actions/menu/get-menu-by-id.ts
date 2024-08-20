const getMenuById = async (menu_id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/menu/${menu_id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const menu = await response.json();

    return menu;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return null;
  }
};

export default getMenuById;
