import { Badge } from "@/components/ui/badge";
import MenuItemDrawer from "./menuItemDrawer";
import Image from "next/legacy/image";

const MenuItemCard = (item: any) => {
  return (
    <div
      key={item.menu_item_id}
      className="flex flex-col justify-between md:flex-row lg:flex-row gap-4 md:gap-4 lg:gap-4 bg-slate-200 shadow-md p-4 rounded-md"
    >
      <div className="h-20 lg:h-full md:h-full w-full md:w-3/5 lg:w-3/5 relative rounded-md overflow-hidden bg-slate-500">
        <Image
          src={item.item_images[0].image_url}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
        {!item.available && (
          <Badge variant={"destructive"} className="absolute bottom-2 right-2">
            {"Out of Stock"}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-4 justify-between w-full md:w-2/5 lg:w-2/5 ">
        <div className="flex flex-col justify-between w-full">
          <h2 className="text-xl font-bold text-ellipsis">{item.title}</h2>
          <p className="text-xs text-ellipsis">{item.description}</p>
          <p className="text-xl font-extrabold mt-2 text-gray-700">
            {item.price} <span className="text-lg text-gray-500">$</span>
          </p>
        </div>
        <MenuItemDrawer {...item} />
      </div>
    </div>
  );
};

export default MenuItemCard;
