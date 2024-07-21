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

import { CircleX, ShoppingBag } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";

type OrderOptionType = {
  menu_item_option_choice_id: number;
  menu_item_option_id: number;
};

const MenuItemDrawer = (item: any) => {
  const { options } = item;

  const [orderOptions, setOrderOptions] = useState<OrderOptionType[]>([]);
  const [note, setNote] = useState("");
  const { addOrderItem, orderItems } = useOrderStore();

  console.log("orderItems-->", orderItems);

  const handleValueChange = (optionId: number, choiceId: number) => {
    setOrderOptions((prevOptions) => {
      const updatedOptions = prevOptions.filter(
        (opt) => opt.menu_item_option_id !== optionId,
      );
      return [
        ...updatedOptions,
        { menu_item_option_id: optionId, menu_item_option_choice_id: choiceId },
      ];
    });
  };

  const handleAddToOrder = () => {
    const orderItem = {
      identifier: orderItems.length + 1,
      note,
      choices: orderOptions,
      menuItemId: item.menu_item_id,
      menuItemUrl: item.item_images[0].image_url,
      menuItemTitle: item.title,
      menuItemDescription: item.description,
      menuItemPrice: item.price,
    };

    console.log("orderItem", orderItem);
    addOrderItem(orderItem);

    toast.success(`Added  ${item.title} to order`, {
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
        <DrawerClose className="absolute right-4 top-4">
          <CircleX size={34} className="z-50 hover:text-slate-700" />
        </DrawerClose>
        <DrawerHeader className="flex h-full w-full flex-col items-center gap-4 p-4 md:p-8 lg:p-8">
          <DrawerTitle className="text-nowrap text-2xl">
            {item.title}
          </DrawerTitle>
          <div className="relative h-52 w-full overflow-hidden rounded-md md:h-32 lg:h-32">
            <Image
              src={item.item_images[0].image_url}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
            {item.description ? (
              <p className="absolute bottom-2 left-2 w-fit rounded-lg bg-white bg-opacity-55 px-2 text-start text-xl text-black">
                {item.description}
              </p>
            ) : null}
            {item.price > 0 ? (
              <Badge
                className="absolute bottom-2 right-2 flex items-end space-x-3 text-xl font-extrabold outline-dashed outline-2 outline-offset-2 drop-shadow-md"
                variant={"secondary"}
              >
                <span className="text-xl font-extrabold text-gray-900">
                  {item.price}
                </span>
                <span className="text-base font-semibold text-gray-500">$</span>
              </Badge>
            ) : null}
          </div>
          <ScrollArea className="no-scrollbar max-h-[40vh] w-full overflow-auto">
            <div className="flex w-full flex-col gap-5">
              {options.map((option: any) => (
                <RadioGroup
                  key={option.menu_item_option_id}
                  className="flex w-full flex-col items-start"
                  onValueChange={(value) =>
                    handleValueChange(
                      option.menu_item_option_id,
                      parseInt(value),
                    )
                  }
                >
                  <p className="basis-2 text-xl font-bold">{option.name}</p>
                  <div className="flex w-full flex-wrap justify-start gap-4 gap-y-3">
                    {option.choices.map((choice: any) => (
                      <div
                        className="flex items-center space-x-2"
                        key={choice.menu_item_option_choice_id}
                      >
                        <RadioGroupItem
                          value={choice.menu_item_option_choice_id}
                          id={choice.menu_item_option_choice_id}
                        />
                        <Label htmlFor={choice.menu_item_option_choice_id}>
                          {choice.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ))}
            </div>
            <div className="mb-16 mt-8 flex w-full flex-col items-start justify-start gap-4">
              <Label htmlFor="note" className="text-xl font-bold">
                Note
              </Label>
              <Textarea
                placeholder="Anything you want to add ..."
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </ScrollArea>
        </DrawerHeader>
        <DrawerFooter className="fixed bottom-2 w-full space-y-3">
          <Button className="text-xl" onClick={handleAddToOrder}>
            Add To order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default MenuItemDrawer;
