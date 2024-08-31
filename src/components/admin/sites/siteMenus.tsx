const SiteMenus = () => {
  const menus = [
    { id: 1, name: "Menu 1" },
    {
      id: 2,
      name: "Menu 2",
    },
    {
      id: 3,
      name: "Menu 3",
    },
    {
      id: 4,
      name: "Menu 4",
    },
    {
      id: 5,
      name: "Menu 5",
    },
    {
      id: 6,
      name: "Menu 6",
    },
  ];

  return (
    <div className="w-1/2">
      <h2 className="text-2xl font-semibold">Menus</h2>
      <div className="flex flex-col gap-3">
        <div className="bg-slate-200 p-2">
          <h3 className="text-xl font-semibold">Add Menu</h3>
        </div>
        {menus.map((menu) => {
          return (
            <div key={menu.id} className="min-w-60 bg-slate-200 p-2">
              <h3 className="text-xl font-semibold">{menu.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteMenus;
