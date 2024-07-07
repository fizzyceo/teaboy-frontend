"use client";
import { useState } from "react";
import { useOrderStore } from "@/stores/order.store";
import Image from "next/legacy/image";
import { toast } from "sonner";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { CircleX, MinusSquare, PlusSquare, ShoppingBag } from "lucide-react";

const MenuItemDrawer = (item: any) => {
  const [quantity, seQuantity] = useState(1);
  const [note, setNote] = useState("");
  const { addOrderItem } = useOrderStore();

  const handleAddToOrder = () => {
    const orderItem = {
      quantity,
      note,
      menuItemId: item.menu_item_id,
      menuItemUrl: item.item_images[0].image_url,
      menuItemTitle: item.title,
      menuItemDescription: item.description,
      menuItemPrice: item.price,
    };

    addOrderItem(orderItem);

    toast.success(`Added ${quantity} ${item.title} to order`, {
      duration: 3000,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <ShoppingBag className="mr-2" size={24} />
          Add To Cart
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto">
        <DrawerClose className="absolute top-4 right-4">
          <CircleX size={34} className="hover:text-slate-700 z-50" />
        </DrawerClose>
        <DrawerHeader className="flex flex-col items-center gap-4 w-full h-full p-4 md:p-8 lg:p-8">
          <DrawerTitle className="text-nowrap text-2xl">
            {item.title}
          </DrawerTitle>
          <div className="h-52 lg:h-32 md:h-32 w-full relative rounded-md overflow-hidden  ">
            <Image
              src={item.item_images[0].image_url}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
            <Badge
              className="flex text-xl items-end space-x-3 absolute outline-offset-2 outline-2 outline-dashed right-2 bottom-2 font-extrabold drop-shadow-md"
              variant={"secondary"}
            >
              <span className="text-xl font-extrabold text-gray-900">
                {item.price}
              </span>
              <span className="text-base font-semibold text-gray-500">DA</span>
            </Badge>
          </div>
          <p className="text-start text-xl w-full">{item.description}</p>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <Label htmlFor="note">Note</Label>
            <Textarea
              placeholder="Anything you want to add ..."
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </DrawerHeader>
        <DrawerFooter className="w-full space-y-3">
          <div className=" w-1/2  flex items-center justify-between  gap-4  rounded-2xl  bg-slate-300 py-2 px-4 self-center">
            <MinusSquare
              onClick={() => seQuantity(quantity > 0 ? quantity - 1 : 0)}
              size={30}
            />
            <div className="text-3xl font-bold">{quantity}</div>
            <PlusSquare onClick={() => seQuantity(quantity + 1)} size={30} />
          </div>
          <Button className="text-xl" onClick={handleAddToOrder}>
            Add To order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default MenuItemDrawer;
