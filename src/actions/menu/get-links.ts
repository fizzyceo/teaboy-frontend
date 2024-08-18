const getLinks = async (base_url: string) => {
  const response = await fetch(
    `https://basseer-internship-backend.onrender.com/menu/links/a`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();

  const links = data.map((menu: any, index: any) => {
    return {
      id: menu.encrypted,
      menu_name: menu.menu_name,
      space_id: menu.space_id,
      space_name: menu.space_name,
      site_image_url: menu.menu_site_image,
      url: `${base_url}/menu/${menu.encrypted}`,
    };
  });

  return links;
};

export default getLinks;
