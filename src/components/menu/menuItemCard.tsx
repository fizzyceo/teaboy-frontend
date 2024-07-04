import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import MenuItemDrawer from "./menuItemDrawer";

const MenuItemCard = (item: any) => {
  return (
    <div
      key={item.menu_item_id}
      className="flex flex-col md:flex-row lg:flex-row gap-4 md:gap-4 lg:gap-4 bg-slate-200 drop-shadow-sm p-4 rounded-md"
    >
      <div className="h-40 lg:h-full md:h-full w-full md:w-1/3 lg:w-1/3 relative rounded-md overflow-hidden bg-slate-500 ">
        <Image
          src={item.item_images[0].image_url}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
        {!item.available ? (
          <Badge variant={"destructive"} className="absolute bottom-2 right-2">
            {"out of stock"}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 w-full md:w-2/3 lg:w-2/3 justify-between">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="text-sm">{item.description}</p>
        <Badge className="flex justify-center" variant={"secondary"}>
          {item.price} DA
        </Badge>
      </div>
      {/* <Button className="w-full lg:w-1/5 md:w-1/5">
        <PlusIcon />
      </Button> */}
      <MenuItemDrawer {...item} />
    </div>
  );
};

export default MenuItemCard;
