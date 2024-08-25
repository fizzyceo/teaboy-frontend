"use client";

import AddMenuItemSheet from "@/components/admin/menu/details/addMenuItemSheet";
import AddedMenuItemCard from "@/components/admin/menu/details/addMenuItemCard";
import { useState } from "react";

const MenuItems = ({ currentMenu }: { currentMenu: any }) => {
  const [menu, setMenu] = useState(currentMenu);
  return (
    <div className="mt-6 flex h-full w-full flex-col">
      <div className="flex w-full justify-start gap-4">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <AddMenuItemSheet menu={menu} setMenu={setMenu} />
      </div>
      <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-4 px-1 py-4">
        {menu.menu_items.length === 0 ? (
          <div className="col-span-4 row-span-1 flex flex-col items-center justify-center gap-4 rounded-md bg-slate-200">
            <p>No menu items added yet.</p>
          </div>
        ) : (
          menu.menu_items.map((item: any) => (
            <AddedMenuItemCard key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MenuItems;
