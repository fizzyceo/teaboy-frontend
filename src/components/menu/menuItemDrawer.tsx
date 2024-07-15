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
        (opt) => opt.menu_item_option_id !== optionId
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
      <DrawerContent className="h-auto  ">
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
            {item.description ? (
              <p className="text-start absolute left-2 bottom-2 text-black bg-white w-fit text-xl px-2 bg-opacity-20 ">
                {item.description}
              </p>
            ) : null}
            {item.price > 0 ? (
              <Badge
                className="flex text-xl items-end space-x-3 absolute outline-offset-2 outline-2 outline-dashed right-2 bottom-2 font-extrabold drop-shadow-md"
                variant={"secondary"}
              >
                <span className="text-xl font-extrabold text-gray-900">
                  {item.price}
                </span>
                <span className="text-base font-semibold text-gray-500">$</span>
              </Badge>
            ) : null}
          </div>
          <ScrollArea className=" w-full overflow-auto max-h-[40vh] no-scrollbar">
            <div className="flex flex-col gap-5  w-full">
              {options.map((option: any) => (
                <RadioGroup
                  key={option.menu_item_option_id}
                  className="flex flex-col items-start w-full"
                  onValueChange={(value) =>
                    handleValueChange(
                      option.menu_item_option_id,
                      parseInt(value)
                    )
                  }
                >
                  <p className="basis-2 font-bold text-xl">{option.name}</p>
                  <div className="flex w-full justify-start gap-4 gap-y-3   flex-wrap">
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
            <div className="w-full mt-8 mb-16 flex flex-col justify-start items-start gap-4">
              <Label htmlFor="note" className="font-bold text-xl">
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
        <DrawerFooter className="w-full space-y-3 fixed bottom-2">
          <Button className="text-xl" onClick={handleAddToOrder}>
            Add To order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default MenuItemDrawer;
