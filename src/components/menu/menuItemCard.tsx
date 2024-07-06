import Image from "next/legacy/image";
import { Badge } from "../ui/badge";
import MenuItemDrawer from "./menuItemDrawer";

const MenuItemCard = (item: any) => {
  return (
    <div
      key={item.menu_item_id}
      className="flex flex-col  md:flex-row lg:flex-row gap-4 md:gap-4 lg:gap-4 bg-slate-200 shadow-md p-4 rounded-md"
    >
      <div className="h-20 lg:h-full md:h-full w-full md:w-2/5 lg:w-2/5 relative rounded-md overflow-hidden bg-slate-500">
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
      <div className="flex flex-col justify-between w-full md:w-3/5 lg:w-3/5 ">
        <div>
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p className="text-sm">{item.description}</p>
        </div>
        <div className="mt-8">
          <Badge className="flex justify-center mb-2" variant={"secondary"}>
            {item.price} DA
          </Badge>
        </div>
        <MenuItemDrawer {...item} />
      </div>
    </div>
  );
};

export default MenuItemCard;
