"use client";
import getMenu from "@/actions/menu/get-menu";
import MenuItemCard from "@/components/menu/menuItemCard";
import OrderDrawer from "@/components/order/orderDrawer";
import { useEffect, useState } from "react";
import { useMenuStore } from "@/stores/menu.store";
import Loading from "@/components/shared/loading";
import MenuItemDrawer from "@/components/menu/menuItemDrawer";
import SiteHeader from "@/components/menu/siteHeader";

const MenuPage = ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { setMenuItems } = useMenuStore();
  const [menu, setMenu] = useState<any>(null);
  useEffect(() => {
    const loadMenu = async () => {
      const menu = await getMenu(
        parseInt(params.menu_id),
        parseInt(searchParams.space_id as string),
      );
      setMenu(menu);
      setMenuItems(menu.menu_items);
    };
    loadMenu();
  }, [params.menu_id, searchParams.space_id, setMenuItems]);

  if (!menu) {
    return <Loading />;
  }

  const { menu_items, spaces } = menu;

  return (
    <div className="bg-slate-50">
      <SiteHeader space={spaces[0]} />
      <div className="flex w-full flex-col items-center p-4">
        <p className="text-xl font-bold">{menu.name}</p>
        <p>{menu.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-20 lg:grid-cols-3 xl:grid-cols-3">
        {menu_items.map((item: any) => (
          <MenuItemDrawer {...item} key={item.menu_item_id} />
        ))}
      </div>
      <div className="fixed bottom-4 w-full px-4">
        <OrderDrawer table_number={parseInt(searchParams.table as string)} />
      </div>
    </div>
  );
};

export default MenuPage;
