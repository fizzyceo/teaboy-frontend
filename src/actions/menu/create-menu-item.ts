const createMenuItem = async (menuItem: any, menu_id: number) => {
  if (!menu_id) {
    return {
      error: "moncef is doing ",
      errors: ["bad"],
    };
  }
  const formData = new FormData();
  formData.append("title", menuItem.title);
  formData.append("description", menuItem.description);
  formData.append("price", menuItem.price);
  formData.append("available", "true");
  formData.append("menu_id", menu_id.toString());
  formData.append("item_images", menuItem.image);

  try {
    const response = await fetch(
      `https://basseer-internship-backend-davh.onrender.com/menu-item`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
export default createMenuItem;
