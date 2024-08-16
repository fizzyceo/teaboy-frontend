import { Badge } from "@/components/ui/badge";
import Image from "next/legacy/image";
import { Button } from "../ui/button";
import { ShoppingBag, ShoppingBasket } from "lucide-react";

const MenuItemCard = (item: any) => {
  return (
    <div
      key={item.menu_item_id}
      className="flex flex-col justify-between gap-4 rounded-md border-2 border-slate-300 bg-gradient-to-tr from-slate-100 to-slate-300 p-3 shadow-md md:flex-row lg:flex-row"
    >
      <div className="relative h-40 w-full rounded-md bg-slate-500 sm:h-20 md:h-32 lg:h-36">
        <Image
          src={item.item_images[0].image_url}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
        {!item.available && (
          <Badge variant={"destructive"} className="absolute bottom-2 right-2">
            {"Out of Stock"}
          </Badge>
        )}
      </div>

      <div className="flex w-full flex-col justify-between gap-4 md:w-2/5 lg:w-2/5">
        <div className="flex w-full flex-col justify-between">
          <h2 className="text-ellipsis text-lg font-bold">{item.title}</h2>
          <p className="text-ellipsis text-xs">{item.description}</p>
          {item.price > 0 && (
            <p className="mt-2 text-xl font-extrabold text-gray-700">
              {item.price} <span className="text-lg text-gray-500">$</span>
            </p>
          )}
        </div>
        <Button
          variant="outline"
          className="flex w-full items-center justify-center font-semibold"
        >
          <ShoppingBasket size={24} className="mr-2" />
          <span>Add To Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;
