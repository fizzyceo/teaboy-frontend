"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CircleX, MinusSquare, PlusSquare, ShoppingBag } from "lucide-react";
import Image from "next/legacy/image";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useOrderStore } from "@/stores/order.store";
import { Badge } from "../ui/badge";

const MenuItemDrawer = (item: any) => {
  const [quantity, seQuantity] = useState(1);
  const [note, setNote] = useState("");
  const { addOrderItem, orderItems } = useOrderStore();

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

    if (quantity === 0) {
      toast.info("Please add at least one item to your order", {
        duration: 3000,
      });
      return;
    }

    addOrderItem(orderItem);

    toast.success(`Added ${quantity} ${item.title} to order`, {
      duration: 3000,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <ShoppingBag className="mr-2" />
          Add To Cart
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto">
        <DrawerClose className="absolute top-4 right-4">
          <CircleX size={34} className="hover:text-slate-700 z-50" />
        </DrawerClose>
        <DrawerHeader className="flex flex-col items-center gap-4 w-full h-full p-4 md:p-8 lg:p-8">
          <DrawerTitle>{item.title}</DrawerTitle>
          <div className="h-60 lg:h-full md:h-full w-full md:w-1/3 lg:w-1/3 relative rounded-md overflow-hidden bg-slate-500 ">
            <Image
              src={item.item_images[0].image_url}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
            <Badge
              className="text-xl absolute right-2 bottom-2 font-extrabold drop-shadow-md"
              variant={"secondary"}
            >
              {item.price} <span className="text-lg text-gray-500"> DA</span>
            </Badge>
          </div>
          <p className="text-start w-full">{item.description}</p>
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
        <DrawerFooter className="w-full">
          <div className=" w-1/2  flex items-center justify-between  gap-4 mt-4 rounded-lg bg-slate-300 py-2 px-4 self-center">
            <MinusSquare
              onClick={() => seQuantity(quantity > 0 ? quantity - 1 : 0)}
            />
            <div className="text-3xl font-bold">{quantity}</div>
            <PlusSquare onClick={() => seQuantity(quantity + 1)} />
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
