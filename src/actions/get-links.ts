const getLinks = async () => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/menu`,
  );

  const data = await response.json();
  console.log("data", data);

  const links = data.map((menu: any, index: any) => {
    return {
      id: index,
      url: `https://basseer-internship-web-app.vercel.app/menu/${menu.menu_id}?table=${randomInt(1, 10)}`,
      restaurant_name: menu.restaurant.name,
    };
  });

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return links;
};

export default getLinks;
