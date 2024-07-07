import getMenu from "@/actions/get-menu";
import MenuItemCard from "@/components/menu/menuItemCard";
import OrderDrawer from "@/components/menu/orderDrawer";
import RestaurantHeader from "@/components/menu/restaurantHeader";
import { useOrderStore } from "@/stores/order.store";
import { MapPin, PhoneCall, Utensils } from "lucide-react";
import Image from "next/legacy/image";

const MenuPage = async ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const menu = await getMenu(parseInt(params.menu_id));

  if (!menu) {
    return <div>Failed to fetch menu</div>;
  }

  const { menu_items, restaurant } = menu;

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
        <OrderDrawer />
      </div>
    </div>
  );
};

export default MenuPage;
