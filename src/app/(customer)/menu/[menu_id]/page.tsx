import getMenu from "@/actions/get-menu";
import MenuItemCard from "@/components/menu/menuItemCard";
import OrderDrawer from "@/components/menu/orderDrawer";
import { Button } from "@/components/ui/button";
import { MapPin, PhoneCall } from "lucide-react";
import Image from "next/legacy/image";

const MenuPage = async ({
  params,
  searchParams,
}: {
  params: { menu_id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const menu_id = parseInt(params.menu_id);
  const menu = await getMenu(menu_id);

  const { menu_items, restaurant } = menu;
  // console.log(menu_items);
  return (
    <div>
      <div className="flex gap-4 items-center w-full bg-slate-200 justify-between px-14 py-4">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="flex gap-4 items-center">
            <MapPin size={16} /> {restaurant.address}
          </p>
          <p className="flex gap-4 items-center">
            <PhoneCall size={16} /> {restaurant.phone}
          </p>
        </div>

        <div className="w-24 h-24 relative rounded-xl overflow-hidden">
          <Image
            src={restaurant.image_url}
            alt={restaurant.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="w-full flex flex-col  p-4 items-center ">
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
