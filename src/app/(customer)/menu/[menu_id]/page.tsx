"use client";
import getMenu from "@/actions/menu/get-menu";
import Loading from "@/components/shared/loading";
import MenuItemDrawer from "@/components/menu/menuItemDrawer";
import OrderDrawer from "@/components/order/orderDrawer";
import SiteHeader from "@/components/menu/siteHeader";
import { useEffect, useState } from "react";
import { useMenuStore } from "@/stores/menu.store";

const MenuPage = ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { menu, setMenu } = useMenuStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const my_menu = await getMenu(
          parseInt(params.menu_id),
          parseInt(searchParams.space_id as string),
        );
        setMenu(my_menu);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [params.menu_id, searchParams.space_id, setMenu]);

  if (loading) {
    return <Loading />;
  }

  if (!menu) {
    return <p>No menu data available.</p>;
  }

  const { menu_items, spaces } = menu;

  if (!spaces || spaces.length === 0) {
    return <p>No spaces available.</p>;
  }

  const space = spaces[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader space={space} />
      <div className="flex w-full flex-col items-center p-4">
        <p className="text-xl font-bold">{menu.name}</p>
        <p>{menu.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-20 lg:grid-cols-3 xl:grid-cols-3">
        {menu_items &&
          menu_items.map((item: any) => (
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
