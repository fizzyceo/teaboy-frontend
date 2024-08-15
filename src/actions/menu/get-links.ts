const getLinks = async (base_url: string) => {
  console.log("fetching_menus...", process.env.NEXT_PUBLIC_BACKEND_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/links/a`,
    {
      cache: "no-store",
    },
  );

  const data = await response.json();
  console.log("fetched_menus:", data);

  const links = data.map((menu: any, index: any) => {
    return {
      id: menu.encrypted,
      menu_name: menu.menu_name,
      space_name: menu.space_name,
      url: `${base_url}/menu/${menu.encrypted}`,
    };
  });

  return links;
};

export default getLinks;
