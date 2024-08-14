const getLinks = async () => {
  console.log("fetching_menus...", process.env.NEXT_PUBLIC_BACKEND_URL);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`, {
    cache: "no-store",
  });

  const data = await response.json();
  console.log("fetched_menus:", data);

  const links = data.map((menu: any, index: any) => {
    return {
      id: index,
      url: `https://basseer-internship-web-app.vercel.app/menu/${menu.menu_id}?table=${randomInt(1, 10)}`,
      restaurant_name: "menu.restaurant.name",
    };
  });

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return links;
};

export default getLinks;
