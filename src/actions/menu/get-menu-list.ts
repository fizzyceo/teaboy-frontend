const getMenuList = async () => {
  try {
    const response = await fetch(
      `https://basseer-internship-backend-davh.onrender.com/menu/list/a/`,
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
