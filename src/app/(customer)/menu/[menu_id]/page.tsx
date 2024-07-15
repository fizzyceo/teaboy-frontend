"use client";
import getMenu from "@/actions/get-menu";
import MenuItemCard from "@/components/menu/menuItemCard";
import OrderDrawer from "@/components/order/orderDrawer";
import RestaurantHeader from "@/components/menu/restaurantHeader";
import { useEffect, useState } from "react";
import { useMenuStore } from "@/stores/menu.store";
import Loading from "@/components/shared/loading";

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
      const menu = await getMenu(parseInt(params.menu_id));
      setMenu(menu);
      setMenuItems(menu.menu_items);
    };
    loadMenu();
  }, [params.menu_id, setMenuItems]);

  if (!menu) {
    return <Loading />;
  }

  const { menu_items, restaurant } = menu;

  const categorySet = new Set();
  const categories: any[] = [];

  menu_items.forEach((menuItem: any) => {
    menuItem.categories.forEach((category: any) => {
      if (!categorySet.has(category.category_id)) {
        categorySet.add(category.category_id);
        categories.push(category);
      }
    });
  });

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} searchParams={searchParams} />
      <div className="w-full flex flex-col p-4 items-center ">
        <p className="text-xl font-bold">{menu.name}</p>
        <p>{menu.description}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-4 pb-20">
        {menu_items.map((item: any) => (
          <MenuItemCard {...item} key={item.menu_item_id} />
        ))}
      </div>
      <div className="fixed bottom-4 px-4 w-full">
        <OrderDrawer table_number={parseInt(searchParams.table as string)} />
      </div>
    </div>
  );
};

export default MenuPage;
