"use client";

import { useState } from "react";
import MenuItemSheet from "@/components/admin/menu/details/menuItemSheet";

const MenuItems = ({ currentMenu }: { currentMenu: any }) => {
  const [menu, setMenu] = useState(currentMenu);

  return (
    <div className="mt-6 flex h-full w-full flex-col">
      <div className="flex w-full justify-between gap-4">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <MenuItemSheet menu={menu} setMenu={setMenu} mode="ADD" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4 px-1 py-4 sm:grid-cols-2 lg:grid-cols-4">
        {menu.menu_items.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center gap-4 rounded-md bg-slate-200">
            <p>No menu items added yet.</p>
          </div>
        ) : (
          menu.menu_items.map((item: any) => (
            <MenuItemSheet
              item={item}
              mode="EDIT"
              key={item.menu_item_id}
              menu={menu}
              setMenu={setMenu}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MenuItems;
