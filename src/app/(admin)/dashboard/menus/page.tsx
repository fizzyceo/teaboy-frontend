import getMenuList from "@/actions/menu/get-menu-list";
import AddMenuNameDialog from "@/components/admin/menu/list/addNewMenuDialog";
import MenuCard from "@/components/admin/menu/list/menuCard";

const AdminMenuPage = async () => {
  const menus = await getMenuList();

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Menus</h1>
      <div className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4">
        <AddMenuNameDialog />
        {menus.map((menu: any) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </section>
  );
};

export default AdminMenuPage;
