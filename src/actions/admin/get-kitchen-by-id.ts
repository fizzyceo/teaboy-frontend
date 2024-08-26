const getKitchenById = async (kitchen_id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8000/kitchen/${kitchen_id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const menu = await response.json();

    return menu;
  } catch (error) {
    console.error("Failed to fetch kitchen:", error);
    return null;
  }
};

export default getKitchenById;
