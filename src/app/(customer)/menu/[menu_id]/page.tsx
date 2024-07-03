import getMenu from "@/actions/get-menu";

const MenuPage = async ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const menu_id = parseInt(params.menu_id);
  const menu = await getMenu(menu_id);
  return (
    <div>
      <h1>Menu {params.menu_id} Page</h1>
      <h2>Table number : {searchParams.table}</h2>
      <p>{JSON.stringify(menu, null, 2)}</p>
    </div>
  );
};

export default MenuPage;
