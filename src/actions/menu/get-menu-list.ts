const getMenuList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/list/a/`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const menus = await response.json();

    return Array.isArray(menus) ? menus : [];
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return [];
  }
};

export default getMenuList;
