const getMenuList = async () => {
  try {
    const response = await fetch(`http://localhost:8000/menu/list/a/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const menus = await response.json();

    return menus;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return null;
  }
};

export default getMenuList;
