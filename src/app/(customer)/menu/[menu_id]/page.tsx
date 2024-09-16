"use client";
import getMenu from "@/actions/menu/get-menu";
import Loading from "@/components/shared/loading";
import MenuItemDrawer from "@/components/menu/menuItemDrawer";
import OrderDrawer from "@/components/order/orderDialog";
import SiteHeader from "@/components/menu/siteHeader";
import { useEffect, useState } from "react";
import { useMenuStore } from "@/stores/menu.store";
import { useOrderStore } from "@/stores/order.store";
import { CircleAlert, FileWarning } from "lucide-react";

const MenuPage = ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { menu, setMenu, isOpen, setIsOpen } = useMenuStore();
  const { setSpaceId } = useOrderStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const my_menu = await getMenu(params.menu_id);
        setIsOpen(my_menu.isOpen);
        setMenu(my_menu);
        setSpaceId(my_menu.spaces[0].space_id);
      } catch (error) {
        console.error("Failed to load menu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [params.menu_id, searchParams.space_id, setIsOpen, setMenu, setSpaceId]);

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
    <div className="no-scrollbar min-h-screen bg-slate-50">
      {!isOpen && (
        <div className="fixed bottom-0 left-0 z-50 flex h-screen w-full flex-col items-center justify-center border border-gray-100 bg-opacity-10 bg-clip-padding py-4 text-center text-3xl font-medium text-black shadow-md backdrop-blur-sm backdrop-filter">
          <p className="flex size-80 flex-col items-center justify-center gap-4 text-wrap rounded-full bg-red-500 bg-opacity-80 px-10 py-5 text-center backdrop-blur-sm backdrop-filter">
            <CircleAlert size={70} className="animate-pulse" />
            The kitchen is now closed, you cant place orders
          </p>
        </div>
      )}

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
