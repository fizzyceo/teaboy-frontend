import EditMenuForm from "@/components/admin/menu/details/editMenuForm";

import getMenuById from "@/actions/menu/get-menu-by-id";
import MenuItems from "@/components/admin/menu/details/menuItems";

const MenuDetailsPage = async ({ params }: { params: { menu_id: number } }) => {
  const currentMenu = await getMenuById(params.menu_id);

  if (!currentMenu) {
    return <p>Menu not found</p>;
  }

  return (
    <section className="flex h-full w-full flex-col justify-start">
      <h1 className="mb-4 text-2xl font-semibold">Menu Details</h1>
      <EditMenuForm currentMenu={currentMenu} />
      <MenuItems currentMenu={currentMenu} />
    </section>
  );
};

export default MenuDetailsPage;
