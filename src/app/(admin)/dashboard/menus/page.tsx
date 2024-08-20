import AddMenuNameDialog from "@/components/admin/menu/addNewMenuDialog";
import MenuCard from "@/components/admin/menu/menuCard";

const AdminMenuPage = () => {
  const menus = [
    {
      id: 1,
      name: "menu 1",
      description: "Main Menu",
    },
    {
      id: 2,
      name: "menu 2",
      description: "VIP Menu",
    },
    {
      id: 3,
      name: "menu 3",
      description: "Lunch Menu",
    },
    {
      id: 4,
      name: "menu 4",
      description: "Dinner Menu",
    },
    {
      id: 5,
      name: "menu 5",
      description: "Breakfast Menu",
    },
    {
      id: 6,
      name: "menu 6",
      description: "Special Menu",
    },
    {
      id: 7,
      name: "menu 7",
      description: "Drinks Menu",
    },
    {
      id: 8,
      name: "menu 8",
      description: "Dessert Menu",
    },
    {
      id: 9,
      name: "menu 9",
      description: "Kids Menu",
    },
    {
      id: 10,
      name: "menu 10",
      description: "Special Menu",
    },
  ];

  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Menus</h1>
      <div className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 lg:grid-cols-4">
        <AddMenuNameDialog />
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </section>
  );
};

export default AdminMenuPage;
